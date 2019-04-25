const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  doc: [{ type: String, require: true }],
  patient: [{ type: String, require: true }],
  _id: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  userType: {
    type: Number,
    require: true
  }
});

const Hospital = (module.exports = mongoose.model("Hospital", UserSchema));
