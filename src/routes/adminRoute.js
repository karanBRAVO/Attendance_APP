const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const ADMIN_ADD_USER_MODEL = require("../schema_model/admin_addUser");

ROUTER.get("/admin-dashboard", (req, res) => {
  res.render("admin");
  console.log(`[*] rendering admin's page`);
});

ROUTER.post("/admin-dashboard/add-user", (req, res) => {
  console.log(`[*] Got a add user request`);
  let post_obj = {
    name: req.body.addUsername,
    dob: req.body.addUserDob,
    password: req.body.addUserPassword,
    t_id: req.body.addUserID,
  };
  ADMIN_ADD_USER_MODEL.find({
    $or: [{ name: post_obj.name }, { t_id: post_obj.t_id }],
  })
    .then((data) => {
      if (data == null) {
        const addUserToDb = ADMIN_ADD_USER_MODEL(post_obj);
        addUserToDb.save();
        res.send(
          `User added | Go back to admin page: <a href="/admin-dashboard">Admin Dashboard</a>`
        );
      } else {
        res.send(
          `User already exists | Go back to admin page: <a href="/admin-dashboard">Admin Dashboard</a>`
        );
      }
    })
    .catch((err) => {
      console.log(`[!] Error`);
      console.log(err);
    });
});

module.exports = ROUTER;
