// // // //运行一次就好
// const uuid = require("uuid");
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/health", { useNewUrlParser: true });
// const db = mongoose.connection;
// const Hospitals = require("../models/hospital");
// const User = require("../models/user");

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("connected");
// });

// // let newHos = new Hospitals({
// //   name: "汕头附一",
// //   location: "shantou",
// //   userType: 2,
// //   doc: ["李维", "黎为"], //默认未创建
// //   _id: uuid.v4()
// // });

// // // let newUser = new User({
// // //   name: "汕头附二",
// // //   phone: "999",
// // //   username: "shantoufuer",
// // //   password: "shantoufuer",
// // //   userType: 2,
// // //   isCreated: false, //默认未创建
// // //   _id: uuid.v4()
// // // });

// // newHos.save(err => {
// //   if (err) {
// //     //res.json({ err: err });
// //     console.log(err);
// //     return;
// //   } else {
// //     console.log(newHos);
// //     //res.json(newUser);
// //   }
// // });

// const acc = require("../models/accounts");
// const Web3 = require("web3");
// const web3 = new Web3(Web3.givebProvider || "http://localhost:8545");
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("connected");
// });

// let accounts;
// web3.eth.getAccounts().then(res => {
//   for (let i in res) {
//     let newAcc = new acc({
//       address: res[i],
//       used: 0
//     });
//     newAcc.save(err => {
//       if (err) {
//         // res.json({ err: err });
//         return;
//       } else {
//         // res.json(newAcc);
//       }
//     });
//   }
// });
