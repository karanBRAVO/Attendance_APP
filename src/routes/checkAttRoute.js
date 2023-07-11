const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const STUDENT_MODEL = require("../schema_model/student_markAttendance");

ROUTER.get("/check-attendance", (req, res) => {
  res.render("checkAtt");
  console.log("[*] rendering check attendance page");
});

// Todo: to filter results based on post request

ROUTER.post("/check-attendance/get-attendance", (req, res) => {
  console.log(`[*] Got a check attendance post request`);
  // change them based on query
  let key;
  let value;
  STUDENT_MODEL.find()
    .then((data) => {
      if (data != null) {
        res.render("checkAtt", { data: data });
      } else {
        res.send("[!] Nothing to show");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ROUTER;
