const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const contactColl = new mongoose.model("contactColl", contactSchema);

module.exports = contactColl;
