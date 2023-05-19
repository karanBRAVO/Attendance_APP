console.log("------------------------------------------------------------");

console.log("Connecting to database...");

const MONGOOSE = require("mongoose");

const URL = "mongodb://0.0.0.0:27017/attendanceApp";

MONGOOSE.set('strictQuery', false);

MONGOOSE.connect(URL)
  .then(() => {
    console.log(`[+] connected to database.`);
  })
  .catch((err) => {
    if (err) {
      console.log(`[-] Error occured while connecting to database`);
      console.log(err);
    }
  });
