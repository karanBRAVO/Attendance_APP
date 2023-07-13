const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const BCRYPT = require("bcrypt");
const ADMIN_ADD_USER_MODEL = require("../schema_model/admin_addUser");

ROUTER.get("/admin-dashboard", (req, res) => {
  if (req.session.admin_data) {
    res.render("admin");
    console.log(`[*] rendering admin's page`);
  } else {
    res.send(`<h1>Service Unavailable</h1>`);
  }
});

ROUTER.post("/admin-dashboard/add-user", (req, res) => {
  if (req.session.admin_data) {
    console.log(`[*] Got a add user request`);
    let hashPassword = BCRYPT.hashSync(req.body.addUserPassword, 10);
    let post_obj = {
      name: req.body.addUsername,
      dob: req.body.addUserDob,
      password: hashPassword,
      t_id: req.body.addUserID,
    };
    ADMIN_ADD_USER_MODEL.find({
      $or: [{ name: post_obj.name }, { t_id: post_obj.t_id }],
    })
      .then(async (data) => {
        if (data == null || data.length == 0) {
          const addUserToDb = ADMIN_ADD_USER_MODEL(post_obj);
          await addUserToDb.save();
          res.send(
            `<h2 style="color: green;">User added</h2> | Go back to admin page: <a href="/admin-dashboard">Admin Dashboard</a>`
          );
        } else {
          res.send(
            `<h2 style="color: red;">User already exists</h2> | Go back to admin page: <a href="/admin-dashboard">Admin Dashboard</a>`
          );
        }
      })
      .catch((err) => {
        console.log(`[!] Error`);
        console.log(err);
      });
  } else {
    res.send(`<h1>Invalid URL</h1>`);
  }
});

module.exports = ROUTER;
