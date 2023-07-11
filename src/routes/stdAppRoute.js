const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const HEAD_MODEL = require("../schema_model/admin_addUser");
const STUDENT_MODEL = require("../schema_model/student_markAttendance");

ROUTER.get("/student-app-mark-attendance", (req, res) => {
  res.render("stdApp");
  console.log(`[*] rendering student app page`);
});

// Todo: 
// to get the code and maximum students count as generated by head
// then match the code and the number of students added

ROUTER.post("/mark-attendance", (req, res) => {
  console.log(`[*] Got a attendance`);
  let dateObj = new Date();
  let post_code = req.body.code;
  let max_std = 30;  // change this based on head session
  let CODE = 1010;  // change this based on head session
  let post_obj = {
    date: dateObj.toDateString(),
    name: req.body.stdName,
    roll: req.body.stdRoll,
    teacher_name: req.body.teacher_name,
    teacher_id: req.body.teacher_id,
    subject: req.body.stdSub,
    class: req.body.stdClass,
  };

  HEAD_MODEL.find({
    $and: [{ name: post_obj.teacher_name }, { t_id: post_obj.teacher_id }],
  })
    .then((data) => {
      if (data != null) {
        if (post_code == CODE) {
          let attendance = STUDENT_MODEL(post_obj);
          attendance.save();
          res.send("Marked your presence");
        } else {
          res.send(`code is invalid`);
        }
      } else {
        res.send("No teacher found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ROUTER;