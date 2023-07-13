const EXPRESS = require("express");
const PATH = require("path");
require("../conn/conn");
const SESSION = require("express-session");
const COOKIE_PARSER = require("cookie-parser");

const ADMIN_ROUTE = require("../routes/adminRoute");
const HEAD_LOGIN_ROUTE = require("../routes/headLoginRoute");
const HEAD_SESSION_ROUTE = require("../routes/headSessionRoute");
const STD_APP_ROUTE = require("../routes/stdAppRoute");
const CHECK_ATT = require("../routes/checkAttRoute");
const SEC_ADMIN_ROUTE = require("../routes/sec_adminRoute");

const APP = EXPRESS();
const PORT = process.env.PORT || 5678;
const IP = `localhost`;

const PUBLIC_PATH = PATH.join(__dirname, `../../public/`);
const VIEWs_PATH = PATH.join(__dirname, `../../views`);

APP.set("view engine", "ejs");
APP.set("views", VIEWs_PATH);

APP.use(EXPRESS.static(PUBLIC_PATH));
APP.use(
  EXPRESS.urlencoded({
    extended: false,
  })
);
APP.use(
  SESSION({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
APP.use(COOKIE_PARSER());
APP.use("/", ADMIN_ROUTE);
APP.use("/", HEAD_LOGIN_ROUTE);
APP.use("/", HEAD_SESSION_ROUTE);
APP.use("/", STD_APP_ROUTE);
APP.use("/", CHECK_ATT);
APP.use("/", SEC_ADMIN_ROUTE);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(`[-] Error while starting the app`);
    console.log(err);
  } else {
    console.log(`[+] App started`);
    console.log(`Visit the site: http://${IP}:${PORT}/admin-login`);
    console.log(`Visit the site: http://${IP}:${PORT}/head-login`);
    console.log(`Visit the site: http://${IP}:${PORT}/student-app-mark-attendance`);
  }
});
