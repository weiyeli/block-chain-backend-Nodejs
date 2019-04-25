const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const logger = require("./middleWare/logger");
const app = express();
const expressValidator = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// app.use(logger);
//BodyParser MiddleWare



app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//E-validate
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
app.use(
  session({
    //resave: true,
    //saveUninitialized: true,
    secret: "lhb"
    //store: store
  })
);

//登陆确认
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//set static folder
//在public folder下的html自动生成静态网页
app.use(express.static(path.join(__dirname, "public")));

app.use("/apis/members", require("./routes/apis/member"));
app.use("/user", require("./routes/auth/user"));
app.use("/home", require("./routes/account/profile"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ok:${PORT}`));
