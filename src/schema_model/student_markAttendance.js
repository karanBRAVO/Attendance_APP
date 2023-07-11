const MONGOOSE = require("mongoose");

const SCHEMA = MONGOOSE.Schema({
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  teacher_name: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

const STUDENT_MODEL = MONGOOSE.model("student", SCHEMA);

module.exports = STUDENT_MODEL;
