const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();

ROUTER.get("/head-login", (req, res) => {
  res.render("headLogin");
  console.log(`[*] rendering head login page`);
});

let data_obj = {
  name: "karan",
  date_time: "2004-03-29",
  password: "12345678",
};

ROUTER.post("/head-login/handle-post/login", (req, res) => {
  let user_name = req.body.userName;
  let date_time = req.body.dateTime;
  let user_id = req.body.userId;
  
  if (user_name == data_obj.name && date_time == data_obj.date_time && user_id == data_obj.password) {
    res.render("headSession");
    console.log(`[+] head logged in`);
  }
  else {
    console.log(`[-] head entered invalid credentials`);
    res.redirect("/head-login");
  }
});

module.exports = ROUTER;
