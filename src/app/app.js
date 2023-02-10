const EXPRESS = require('express')
const PATH = require('path')
require('../conn/conn')
const HEAD_MODEL = require('../schema_model/model1')

const APP = EXPRESS()

const PORT = process.env.PORT || 9901
const SLUG = `head`

const PUBLIC_PATH = PATH.join(__dirname, "../../public")
const VIEWS_PATH = PATH.join(__dirname, "../../views")

APP.use(EXPRESS.static(PUBLIC_PATH))

APP.set('view engine', 'hbs')
APP.set("views", VIEWS_PATH)

APP.get("/head", (req, res) => {
    res.render("head")
})
APP.get("/head2", (req, res) => {
    res.render("head2")
})
APP.get("/head3", (req, res) => {
    res.render("head3")
})
APP.get("/studentApp", (req, res) => {
    res.render("studentApp")
})
APP.get("/studentLogin", (req, res) => {
    res.render("studentLogin")
})

APP.listen(PORT, (err) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log(`App is starting...`)
        console.log(`http://localhost:${PORT}/${SLUG}`)
    }
})
