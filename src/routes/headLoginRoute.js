const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const ADMIN_ADD_USER_MODEL = require("../schema_model/admin_addUser");

ROUTER.get("/head-login", (req, res) => {
  res.render("headLogin");
  console.log(`[*] rendering head login page`);
});

ROUTER.post("/head-login/handle-post/login", (req, res) => {
  let post_obj = {
    name: req.body.userName,
    dob: req.body.dateTime,
    password: req.body.userPass,
    t_id: req.body.userT_id,
  };

  ADMIN_ADD_USER_MODEL.findOne(post_obj)
    .then((data) => {
      if (data != null) {
        req.session.head_login_data = { name: post_obj.name, t_id: post_obj.t_id };
        res.redirect("/head-start-session");
        console.log(`[+] head logged in`);
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
