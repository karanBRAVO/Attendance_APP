const MONGOOSE = require('mongoose')

const headSchema = new MONGOOSE.Schema({
    userName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    studentCount: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

module.exports = headSchema