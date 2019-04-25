const Web3 = require("web3");
const web3 = new Web3(Web3.givebProvider || "http://localhost:7545");
const abii = require("./abi");

const adr = "0xF87FA0F671918D92c006140443899FE375b2ADe4";

let sampleContract = new web3.eth.Contract(abii[0], adr);
sampleContract.methods
  .getName()
  .call()
  .then(console.log);
// module.exports = function(cb) {
//   if (typeof patientRecContract != "undefined") cb(patientRecContract);
//   else callback = cb;
// };

//var con = () => ();
///deployContract(con);

// const compiledContract = solc.compile(
//   fs.readFileSync("../contracts/PatientRec.sol").toString()
// );

// var input = {
//   language: "Solidity",
//   sources: {
//     "PatientRec.sol": {
//       content: fs.readFileSync("../contracts/PatientRec.sol").toString()
//     }
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"]
//       }
//     }
//   }
// };

// var output = JSON.parse(solc.compile(JSON.stringify(input)));

// const abi = output.contracts["PatientRec.sol"]["Ehealth"]["abi"];
// const bytecode =
//   output.contracts["PatientRec.sol"]["Ehealth"]["evm"]["bytecode"]["object"];

// web3.eth
//   .getAccounts()
//   .then(res => {
//     accounts = res;
//   })
//   .then(() => {
//     patientRec
//       .deploy({
//         data: bytecode,
//         arguments: ["xiaoli", "male", 23]
//       })
//       .send({ from: accounts[0], gas: 1500000 }) //accounts[0] => 病人账号
//       .then(res => (module.exports = res));
//   });

//每个病人账户deploy一个contract，医生的地址固定
// let hos_acc = [
//   "0x2cE052ecEd6E076F515C4F2026B3ea22ab2da4d9",
//   "0x50751a1A8CD3319a714e3E8258d5e38309ae2343",
//   "0x356D5A5988a950c089967e80d676C7Bc6FFbc2fA",
//   "0xBA9057e6a7c2fAA23667B2860f8a30E9A542bb8b",
//   "0xF05a3E4D639A4d7C51f38e3a95cA345C1b469f6C",
//   "0xbD9DF4f43bD50Bd7B15F8368104ba18E3cA9A2b1"
// ];
// let pat_acc = [
//   "0x106AeB4D78ace6E689D28D9cBe42b955D6CcA1bb",
//   "0x0E6182e99629d378f69FcFAe18dCF5E4a81aFCEC",
//   "0x438208080630463f7B93aFC6feED021D64e38820",
//   "0xB7906c90B61e3a5eFF723DdAd36514B5702e9965"
// ];
// let hos_obj_acc = [];
// for (let i = 0; i < hos_acc.length; i++) {
//   let obj = {};
//   obj["address"] = hos_acc[i];
//   obj["used"] = 0;
//   hos_obj_acc.push(obj);
// }

// let pat_obj_acc = [];
// for (let i = 0; i < pat_acc.length; i++) {
//   let obj = {};
//   obj["address"] = pat_acc[i];
//   obj["used"] = 0;
//   pat_obj_acc.push(obj);
// }

// console.log(hos_obj_acc);

/////////////
//web3.eth.defaultAccount = web3.eth.accounts[0];

// const usr = {

// );

// contr.methods
//   .setHealthRec("nimabi")
//   .send(usr, (err, res) => {
//     //console.log(res);
//   });

// //把用户的地址提取出来对比再放进去。
// contr.methods
//   .getHealthRec()
//   .call( usr, (err, res) => {
//     console.log(res);
//   });
// //.then(v => console.log(v));
