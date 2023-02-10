const MONGOOSE = require('mongoose')

const URL = `mongodb://localhost:27017/Attendance_App`

MONGOOSE.set('strictQuery', true)

MONGOOSE.connect(URL).then(() => {
    console.log(`[CONNECTED] database created`)
}).catch((err) => {
    console.log(err)
})