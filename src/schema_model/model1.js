const MONGOOSE = require('mongoose')
const headSchema = require('./schema1')

const COLLECTION_NAME = `headData`

const headModel = new MONGOOSE.model(COLLECTION_NAME, headSchema)

module.exports = headModel