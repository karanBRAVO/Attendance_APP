const MONGOOSE = require("mongoose");

const SCHEMA = MONGOOSE.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  t_id: {
    type: String,
    required: true,
  },
});

const ADMIN_ADD_USER_MODEL = MONGOOSE.model("headuser", SCHEMA);

module.exports = ADMIN_ADD_USER_MODEL;
