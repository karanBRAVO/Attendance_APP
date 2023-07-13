const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const BCRYPT = require("bcrypt");
const SEC_ADMIN_MODEL = require("../schema_model/sec_admin");

ROUTER.get("/admin-login", (req, res) => {
  res.render("sec_admin");
  console.log(`[*] rendering admin login page`);
});

ROUTER.post("/admin-login/handle-post", (req, res) => {
  console.log(`[*] Got admin login post request`);

  let userName = req.body.admin_username;  // for test: karan yadav
  let userPass = req.body.admin_password;  // for test: 1234567890

  SEC_ADMIN_MODEL.findOne({ username: userName })
    .then((data) => {
      if (data == null) {
        res.send(`<h1 style="color: red;">Incorrect Username<h1>
        <p><a style="color: blue; font-size: 1em; font-family: sans-serif; text-decoration: underline; text-transform: uppercase" href="/admin-login">Login</a> again<p>`);
      } else {
        if (BCRYPT.compareSync(userPass, data.secret)) {
          req.session.admin_data = { name: userName };
          res.redirect("/admin-dashboard");
          console.log(`[+] Admin logged in`);
        } else {
          res.send(`<h3 style="color: red; font-size: 2em; font-weight: 900; font-family: monospace">Invalid Credentials</h3>
          <p><a style="color: blue; font-size: 1em; font-family: sans-serif; text-decoration: underline; text-transform: uppercase" href="/admin-login">Login</a> again<p>`);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ROUTER;
