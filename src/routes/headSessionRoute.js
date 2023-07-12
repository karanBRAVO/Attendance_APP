const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const gen_code = require("../functions/codeGenerator");
const SESSION_STORAGE_MODEL = require("../schema_model/sessionStorage");

ROUTER.get("/head-start-session", (req, res) => {
  if (req.session.head_login_data) {
    res.render("headSession", { data: req.session.head_login_data });
    console.log("[*] rendering head session page");
  } else {
    res.send(
      `<a href="/head-login" style="color: blue; font-family: sans-serif; font-weight: 600; font-size: 2em">Login</a>
      <p>you are not logged in || make sure you have account</p>
      <span>Click the above link</span>`
    );
  }
});

ROUTER.post("/head-session-get-code", (req, res) => {
  if (req.session.head_login_data) {
    let date_obj = new Date();
    let stdCount = req.body.stdCount;
    let stdSubject = String(req.body.stdSub).toLocaleLowerCase();
    req.session.head_login_data["stdCount"] = stdCount;
    req.session.head_login_data["stdSubject"] = stdSubject;
    let usr_code = gen_code();
    let teacherName = req.session.head_login_data.name;
    let teacherId = req.session.head_login_data.t_id;
    let session_data_obj = {
      date: date_obj.toLocaleDateString(),
      status: true,
      head_name: teacherName,
      head_id: teacherId,
      code: usr_code,
      student_count: Number(stdCount),
      subject: stdSubject,
    };
    SESSION_STORAGE_MODEL.find({
      $and: [{ head_name: teacherName }, { head_id: teacherId }],
    })
      .then(async (data) => {
        if (data == null || data.length == 0) {
          const store_session_data = SESSION_STORAGE_MODEL(session_data_obj);
          await store_session_data.save();
          console.log(`[*] new user started session`);
        } else {
          SESSION_STORAGE_MODEL.updateOne(
            {
              $and: [{ head_name: teacherName }, { head_id: teacherId }],
            },
            {
              $set: {
                date: session_data_obj.date,
                status: session_data_obj.status,
                code: session_data_obj.code,
                student_count: session_data_obj.student_count,
                subject: session_data_obj.subject,
              },
            }
          )
            .then((up_data) => {
              console.log("Updated ", up_data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    res.render("headSession", {
      data: req.session.head_login_data,
      code: usr_code,
    });
    console.log("[*] rendering head session page after generating code");
  } else {
    res.send(
      `<a style="color:black;font-size:2em;font-weight:800;font-family:sans-serif;padding:3px;margin:0 3px;" href="/head-login">Login</a> Please, you are not logged in`
    );
  }
});

ROUTER.get("/head-session/stop-session", (req, res) => {
  if (req.session.head_login_data) {
    SESSION_STORAGE_MODEL.updateOne(
      {
        $and: [
          { head_name: req.session.head_login_data.name },
          { head_id: req.session.head_login_data.t_id },
          { status: true },
        ],
      },
      { $set: { status: false } }
    )
      .then((up_data) => {
        console.log("Updated ", up_data);
        SESSION_STORAGE_MODEL.findOne({
          $and: [
            { head_name: req.session.head_login_data.name },
            { head_id: req.session.head_login_data.t_id },
          ],
        })
          .then((result) => {
            res.send(
              `<h1 style="color: black; font-family: sans-serif; text-transform: uppercase; font-size: 3em; font-weight: 900;text-decoration: underline">Logged Out</h1>
          <p>Total Students: ${req.session.head_login_data.stdCount}</p>
          <p>Left Students: ${result.student_count}</p>
          <p>Marked: ${
            Number(req.session.head_login_data.stdCount) -
            Number(result.student_count)
          }</p>
          <p>Subject: ${req.session.head_login_data.stdSubject}</p>
          <p style="padding: 3px; margin: 4px; font-family: serif; font-size: 1.3em;"><a href="/check-attendance">Check Attendance</a></p>`
            );
            req.session.destroy((err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`[*] session destroyed`);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send(
      `<a style="font-family:sans-serif; font-weight:800; color: blue; padding: 0 3px; margin: 0 3px;text-transform: capitalize;" href="/head-login">Login Please</a> | you are not logged in`
    );
  }
});

module.exports = ROUTER;
