const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const gen_code = require("../functions/codeGenerator");

ROUTER.get("/head-start-session", (req, res) => {
  if (req.session.head_login_data) {
    res.render("headSession", { data: req.session.head_login_data });
    console.log("[*] rendering head session page");
  } else {
    res.send(`<a href="/head-login">Login</a> Please, you are not logged in`);
  }
});

// Todo: to store the code and number of students

ROUTER.post("/head-session-get-code", (req, res) => {
  if (req.session.head_login_data) {
    let stdCount = req.body.stdCount;
    let usr_code = gen_code();
    req.session.head_login_data[`stdCount`] = stdCount;

    res.render("headSession", {
      data: req.session.head_login_data,
      code: usr_code,
    });
    console.log("[*] rendering head session page after generating code");
  } else {
    res.send(`<a href="/head-login">Login</a> Please, you are not logged in`);
  }
});

module.exports = ROUTER;
