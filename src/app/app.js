const EXPRESS = require("express");
const PATH = require("path");
require("../conn/conn");
const HEAD_MODEL = require("../schema_model/headModel");
// functions
const getCode = require("../functions/getCode");

const APP = EXPRESS();
const PORT = 5678;
const IP = `localhost`;

const PUBLIC_PATH = PATH.join(__dirname, `../../public/`);
const VIEWs_PATH = PATH.join(__dirname, `../../views`);

APP.use(EXPRESS.static(PUBLIC_PATH));
APP.set("view engine", "hbs");
APP.set("views", VIEWs_PATH);

APP.use(
  EXPRESS.urlencoded({
    extended: false,
  })
);

// head
APP.get("/head-login", (req, res) => {
  res.render("headLogin");
});

let head_user_name;  // to store the head user name
let code;  // to store the session code 

APP.post("/login-head", (req, res) => {
  let userName = String(req.body.userName);
  let dateTime = String(req.body.dateTime);
  let userId = String(req.body.userId);

  HEAD_MODEL.findOne({ user_name: userName })
    .then((data) => {
      console.log("Data=", data);
      if (data != null) {
        console.log("[+] Correct UserName");
        if (data.user_id == userId) {
          console.log("[+] Correct UserId");
          head_user_name = data.user_name;
          code = "Enter the total number of students";
          res.render("headSession", { code: code, head_user_name: head_user_name });
        } else {
          console.log("[-] Incorrect UserId");
          res.send("User matched | Incorrect Userid");
        }
      } else {
        console.log("[-] Incorrect UserName");
        res.send(
          "User did not matched | Incorrect Username | contact the admin"
        );
      }
    })
    .catch((err) => {
      console.log(`[-] Error while fetching the data`);
      console.log(err);
    });
});

APP.get("/head-get-code", (req, res) => {
  code = getCode();
  console.log(`[+] code generated`);
  res.render("headSession", { code: code, head_user_name: head_user_name });
});

// admin
APP.get("/addData", (req, res) => {
  res.render("admin");
});

APP.post("/add-new-user/to-database", async (req, res) => {
  let new_userId = req.body.addUserId;
  let new_userName = req.body.addUsername;
  if (String(new_userId).length > 0 && String(new_userName).length > 0) {
    const addDataToDb = new HEAD_MODEL({
      user_name: new_userName,
      user_id: new_userId,
    });
    await addDataToDb.save();
    res.send(`Data added successfully | Data: ${new_userId}, ${new_userName}`);
  } else {
    res.send("Invalid Credentials Entered");
  }
});

APP.listen(PORT, (err) => {
  if (err) {
    console.log(`[-] Error while starting the app`);
    console.log(err);
  } else {
    console.log(`[+] App started`);
    console.log(`Visit the site: http://${IP}:${PORT}/head-login`);
  }
});
