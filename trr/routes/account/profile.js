const express = require("express");
const router = express.Router();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("../../models/user");
const Hospitals = require("../../models/hospital");
const Web3 = require("web3");
const web3 = new Web3(Web3.givebProvider || "http://localhost:8545");
const abii = require("../../config/abi");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/health", { useNewUrlParser: true });
const db = mongoose.connection;

const Accounts = require("../../models/accounts");

let hos = require("../../models/realHospital.json");

///////////////////////
let patientRecContract;
let accounts;

let patientRec = new web3.eth.Contract(abii[0]);
const bytecode = abii[1]["object"];

function deployContract(name, gender, age, acc, callback) {
  let arg = [];
  arg.push(name);
  arg.push(gender);
  arg.push(age);
  patientRec
    .deploy({
      data: bytecode,
      arguments: arg
    })
    .send({ from: acc, gas: 1500000 }) //accounts[0] => 病人账号
    .then(res => {
      patientRecContract = res;
      callback();
    });
}
///////////////////////

router.use(session({ secret: "lhb" }));
router.use(cookieParser());

router.get("/", (req, res) => {
  if (req.session.username) res.json({ msg: "ok!" });
  else res.json({ msg: "not ok" });
});

router.get("/hospitals", (req, res) => {
  Hospitals.find({}, (error, result) => res.json(result));
  //res.json({ msg: hos });
});

// router.get("/hospitals/:name", (req, res) => {
//   //res.json(req.params.name);
//   Hospitals.find({ name: req.params.name }, (error, result) =>
//     res.json(result)
//   );
// });

router.post("/hospitals/:name/reservation", (req, res) => {
  // res.send(req.params.name)
  if (!req.session.username) res.json({ msg: "not ok!" });
  else {    
    let query = { username: req.session.username };
    User.findOne(query, (err, result) => {
      Hospitals.findOne({ name: req.params.name }, (e, r) => {
        sampleContract = new web3.eth.Contract(abii[0], result.contract);
        sampleContract.methods
          .authens(r.address)
          .send({ from: result.acc })
          .then(re => res.send("1"))
          .catch(er => res.send("0"));

        let tmp = r.patient;
        tmp.push(result.name);
        r.patient = tmp;
        r.save();
        //写到修改病历去
        // sampleContract.methods
        //   .setRec("wohaokaixin")
        //   .send({ from: r.address })
        //   .then(rr => console.log(rr));
        //写到查看病历去
        // sampleContract.methods
        //   .getRec()
        //   .call({ from: r.address })
        //   .then(rr => console.log(rr));
      });
    });
  }
});

router.get("/check/:name", (req, res) => {});

router.post("/createinfo", (req, res) => {
  if (!req.session.username) res.json({ msg: "get logged in" });
  else {
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    console.log(name, gender, age);
    let cons = function() {
      console.log(patientRecContract.options.address);
      let query = { username: req.session.username };
      User.findOne(query, (err, acc) => {
        acc.contract = patientRecContract.options.address;
        acc.save();
      });
    };
    let accountz;
    Accounts.findOne({ used: 0 }, (err, acc) => {
      acc.used = 1;
      User.findOne({ username: req.session.username }, (err, rs) => {
        rs.acc = acc.address;
        rs.save();
      });
      acc.save();
      //TODO:
      //post信息
      deployContract(name, gender, age, acc.address, cons);
    });
    //let acc = genAcc();//

    //把abi bytcode account[0]存起来
  }
});

router.get("/checkinfo/:name", (req, res) => {
  if (!req.session.username) res.json({ msg: "get logged in" });
  else {
    let sampleContract;
    User.find({ name: req.params.name }, (error, result) => {
      if (result[0].userType == 1) {
        sampleContract = new web3.eth.Contract(abii[0], result[0].contract);
        sampleContract.methods
          .getRec()
          .call({ from: result[0].acc })
          .then(r => {
            // console.log(r);
            // console.log(r["3"]);
            let tmpArr = r["3"].split("***终结***");
            let resArr = [];
            for (let i = 0; i < tmpArr.length - 1; i++) {
              let tt = tmpArr[i].split(":::");
              let objj = {};
              objj["record"] = tt[0];
              objj["doctor"] = tt[1];
              objj["date"] = tt[2];
              objj["hospital"] = tt[3];
              resArr.push(objj);
            }
            res.json( resArr);
          });
        // .catch(er => res.json({ er }));
      } else {
        Hospitals.find({ username: req.session.username }, (err, rr) => {
          sampleContract = new web3.eth.Contract(abii[0], result[0].contract);
          sampleContract.methods
            .getRec()
            .call({ from: rr[0].address })
            .then(r => {
              // console.log(r["3"]);
              let tmpArr = r["3"].split("***终结***");
              let resArr = [];
              for (let i = 0; i < tmpArr.length - 1; i++) {
                let tt = tmpArr[i].split(":::");
                let objj = {};
                objj["record"] = tt[0];
                objj["doctor"] = tt[1];
                objj["date"] = tt[2];
                objj["hospital"] = tt[3];
                resArr.push(objj);
              }
              res.json( resArr );
            })
            .catch(er => res.json({ msg: "无权限！" }));
        });
      }
    });

    // patientRecContract.methods
    //   .setRec()
    //   .send({ from: "0x2cE052ecEd6E076F515C4F2026B3ea22ab2da4d9" })
    //   .then(r => res.json({ msg: r }));
    // deployContract("xiaoli", "male", 12, accounts[0], cons);
  }
});

router.post("/edit/:name", (req, res) => {
  if (!req.session.username) res.json({ msg: "get logged in" });
  else {
    let newRecord = req.body.record;
    let newDoc = req.body.doctor;
    let newDate = req.body.date;
    let newHospital = req.body.hospital;

    let sampleContract;
    User.find({ name: req.params.name }, (err, rr) => {
      Hospitals.find({ username: req.session.username }, (error, result) => {
        // console.log(rr)
        sampleContract = new web3.eth.Contract(abii[0], rr[0].contract);
        sampleContract.methods
          .getRec()
          .call({ from: result[0].address })
          .then(r => {
            //newRecord = r["3"];
            let tmpRec =
              r["3"] +
              newRecord +
              ":::" +
              newDoc +
              ":::" +
              newDate +
              ":::" +
              newHospital +
              "***终结***";
            //console.log(typeof newRecord);
            sampleContract.methods
              .setRec(tmpRec)
              .send({ from: result[0].address, gas:8000000 })
              .then((e,r) => { if(e) res.send(e);res.json({ msg: r })})
              // .catch(errrr => res.json({ msg: errrr, e: "error" }));
          });
      });
    });
  }
  // let newRec = ";3.taishabile";
  // let obj = pat.find(p => p.name === req.params.name);
  // if (obj) {
  //   let tmp = pat.find(p => p.name === req.params.name).rec + newRec;
  //   pat.find(p => p.name === req.params.name).rec = tmp;
  //   res.json(pat.find(p => p.name === req.params.name));
  // } else res.json({ msg: "no such person!" });
});

module.exports = router;
