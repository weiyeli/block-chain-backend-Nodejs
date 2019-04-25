const mongoose = require("mongoose");

const AccountsSchema = mongoose.Schema({
  address: {
    type: String,
    require: true
  },
  used: {
    type: Number,
    require: true
  }
});

const Accounts = (module.exports = mongoose.model("Accounts", AccountsSchema));
