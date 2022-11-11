const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  key: {
    type: String,
  },
  rkey: {
    type: String,
  }
});

const signupCollection = new mongoose.model("signupCollection", signupSchema);

module.exports = signupCollection;
