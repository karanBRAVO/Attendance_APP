const EXPRESS = require("express");
const PATH = require("path");
require("../conn/conn");
const ADMIN_ROUTE = require("../routes/adminRoute");
const HEAD_ROUTE = require("../routes/headLoginRoute");

const APP = EXPRESS();
const PORT = process.env.PORT || 5678;
const IP = `localhost`;

const PUBLIC_PATH = PATH.join(__dirname, `../../public/`);
const VIEWs_PATH = PATH.join(__dirname, `../../views`);

APP.use(EXPRESS.static(PUBLIC_PATH));
APP.set("view engine", "ejs");
APP.set("views", VIEWs_PATH);

APP.use(
  EXPRESS.urlencoded({
    extended: false,
  })
);
APP.use("/", ADMIN_ROUTE);
APP.use("/", HEAD_ROUTE);

APP.listen(PORT, (err) => {
  if (err) {
    console.log(`[-] Error while starting the app`);
    console.log(err);
  } else {
    console.log(`[+] App started`);
    console.log(`Visit the site: http://${IP}:${PORT}/head-login`);
  }
});
