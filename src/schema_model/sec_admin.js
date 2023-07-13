const MONGOOSE = require('mongoose');

const SCHEMA = MONGOOSE.Schema({
    username: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
    }
});

const SEC_ADMIN_MODEL = MONGOOSE.model("secadmin", SCHEMA);

module.exports = SEC_ADMIN_MODEL;
