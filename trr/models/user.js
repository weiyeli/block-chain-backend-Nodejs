const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  _id: {
    type: String,
    require: true
  },
  isCreated: {
    type: Boolean,
    require: true
  },
  acc: {
    type: String,
    require: false
  },
  contract: {
    type: String,
    require: false
  },
  userType: {
    type: Number,
    require: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));
