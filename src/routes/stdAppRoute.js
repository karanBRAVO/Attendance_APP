const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const STUDENT_MODEL = require("../schema_model/student_markAttendance");
const SESSION_STORAGE_MODEL = require("../schema_model/sessionStorage");

ROUTER.get("/student-app-mark-attendance", (req, res) => {
  res.render("stdApp");
  console.log(`[*] rendering student app page`);
});

ROUTER.post("/mark-attendance", (req, res) => {
  console.log(`[*] Got a attendance`);
  let dateObj = new Date();
  let post_code = req.body.code;
  let post_obj = {
    date: dateObj.toLocaleDateString(),
    name: req.body.stdName,
    roll: req.body.stdRoll,
    teacher_name: req.body.teacher_name,
    teacher_id: req.body.teacher_id,
    subject: String(req.body.stdSub).toLocaleLowerCase(),
    class: req.body.stdClass,
  };

  SESSION_STORAGE_MODEL.findOne({
    $and: [
      { date: post_obj.date },
      { head_name: post_obj.teacher_name },
      { head_id: post_obj.teacher_id },
      { status: true },
      { code: post_code },
      { subject: post_obj.subject },
    ],
  })
    .then(async (data) => {
      if (data != null) {
        console.log("[*] Teacher found, Session is running");
        if (data.student_count > 0) {
          SESSION_STORAGE_MODEL.updateOne(data, {
            $set: { student_count: Number(data.student_count) - 1 },
          })
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          const store_att = STUDENT_MODEL(post_obj);
          await store_att.save();
          console.log("[*] marked attendance");
          res.send(
            `<h1 style="color: green; font-family: monospace; font-size: 3em; font-weight: 900; padding: 2px; margin: 3px;">Marked your Presence</h1>`
          );
        } else {
          console.log("[*] Students are full");
          res.send(
            `<h1 style="color: red; font-size: 3em; font-weight: 900; font-family: serif;">[!] ERROR</h1>
            <p>You cannot mark your attendance, students are full</p>`
          );
        }
      } else {
        console.log(`[*] No session running`);
        res.send(`
        <div>
          <h1 style="padding: 3px; margin: 3px; color: red; font-family: sans-serif; font-size: 3em; font-weight: 900;">! ERROR</h1>
          <p>No session found || server error || Make sure details are correct</p>
        </div>
        `);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ROUTER;
