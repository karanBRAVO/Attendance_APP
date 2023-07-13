const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const BCRYPT = require("bcrypt");
const ADMIN_ADD_USER_MODEL = require("../schema_model/admin_addUser");

ROUTER.get("/head-login", (req, res) => {
  res.render("headLogin");
  console.log(`[*] rendering head login page`);
});

ROUTER.post("/head-login/handle-post/login", (req, res) => {
  let post_obj = {
    name: req.body.userName,
    dob: req.body.dateTime,
    t_id: req.body.userT_id,
  };

  ADMIN_ADD_USER_MODEL.findOne({
    $and: [
      { name: post_obj.name },
      { dob: post_obj.dob },
      { t_id: post_obj.t_id },
    ],
  })
    .then((data) => {
      if (data != null) {
        if (BCRYPT.compareSync(req.body.userPass, data.password)) {
          req.session.head_login_data = {
            name: post_obj.name,
            t_id: post_obj.t_id,
          };
          res.redirect("/head-start-session");
          console.log(`[+] head logged in`);
        } else {
          res.send(
            `<h1 style="color: red;">Wrong Password</h1> | <a href="/head-login">Login</a>`
          );
        }
      } else {
        console.log(`[-] head entered invalid credentials`);
        res.send(`No account found | <a href="/head-login">Login</a>`);
      }
    })
    .catch((err) => {
      console.log(`[!] Error`);
      console.log(err);
    });
});

module.exports = ROUTER;
