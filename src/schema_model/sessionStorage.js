const MONGOOSE = require("mongoose");

const SCHEMA = MONGOOSE.Schema({
    date: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    head_name: {
        type: String,
        required: true,
    },
    head_id: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    student_count: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true,
    }
});

const SESSION_STORAGE_MODEL = MONGOOSE.model("sessiondata", SCHEMA);

module.exports = SESSION_STORAGE_MODEL;
