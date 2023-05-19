const MONGOOSE = require("mongoose");

const SCHEMA = new MONGOOSE.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const MODEL = new MONGOOSE.model("headData", SCHEMA);
module.exports = MODEL;
