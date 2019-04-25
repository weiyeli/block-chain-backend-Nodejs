const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/health", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected");
});

router.use(session({ secret: "lhb" }));
router.use(cookieParser());
let user = require("../../models/user");
router.post("/register", (req, res) => {
  // res.send("test");
  const name = req.body.name;
  const phone = req.body.phone;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const utype = req.body.userType;

  req.checkBody("name", "名字不允许为空").notEmpty();
  req.checkBody("phone", "手机号不允许为空").notEmpty();
  req.checkBody("username", "用户名不允许为空").notEmpty();
  req.checkBody("password", "密码不允许为空").notEmpty();
  req.checkBody("userType", "注册类型不允许为空").notEmpty();
  req.checkBody("password2", "密码不一致").equals(req.body.password);

  let err = req.validationErrors();

  if (err) {
    res.send(err);
  } else {
    let newUser = new User({
      name: name,
      phone: phone,
      username: username,
      password: password,
      userType: utype,
      isCreated: false, //默认未创建
      _id: uuid.v4()
    });
    newUser.save(err => {
      if (err) {
        res.json({ err: err });
        return;
      } else {
        res.json(newUser);
      }
    });
  }
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let query = { username: username };
  User.findOne(query, (err, user) => {
    if (err) {
      res.json(err);
      return;
    }
    if (!user) {
      res.json({ errors: "用户不存在"});
      return;
    }
    if (user.password === password) {
      req.session.username = username;
      req.session.password = password;
      res.json({ name: user.name,  userType: user.userType}); //TODO: gei ta

      // res.redirect('/logged');

      return;
    } else {
      res.json({ errors: "密码错误"});
      return;
    }
  });
});

router.get("/logout", (req, res) => {
  if (req.session.username) {
    req.session.destroy(err => {
      if (err) res.negotiate(err);
      res.json({ msg: "logout!" });
    });
  } else {
    res.json({ msg: "log first" });
  }
});

router.get("/logged", (req, res) => {
  if (req.session.username) res.json({ msg: "logged!" });
  else res.json({ msg: "pls log first" });
});

module.exports = router;
