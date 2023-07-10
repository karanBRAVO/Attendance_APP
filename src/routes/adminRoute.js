const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const ADMIN_MODEL = require("../schema_model/admin_addUser");

ROUTER.get("/admin-dashboard", (req, res) => {
  res.render("admin");
  console.log(`[*] rendering admin's page`);
});

// Todo: check for records before adding new user and validate the credentials
ROUTER.post("/admin-dashboard/add-user", (req, res) => {
    const addUserToDb = ADMIN_MODEL({
        name: req.body.addUsername,
        dob: req.body.addUserDob,
        password: req.body.addUserPassword
    });
    addUserToDb.save();
    res.redirect("/admin-dashboard");
});

module.exports = ROUTER;
