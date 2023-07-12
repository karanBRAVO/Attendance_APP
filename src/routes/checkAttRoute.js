const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const STUDENT_MODEL = require("../schema_model/student_markAttendance");
const get_converted_date = require("../functions/getConvertedDate");

ROUTER.get("/check-attendance", (req, res) => {
  let query_obj = {};
  try {
    let search_values_arr = req.url.split("?")[1].split("&");

    for (let i = 0; i < search_values_arr.length; i++) {
      let _split_ = search_values_arr[i].split("=");
      let key = _split_[0];
      let value = _split_[1].split('+').join(" ");
      if (key == 'date' && value.length > 0) {
        value = get_converted_date(value);
      }
      if (value && _split_) {
        query_obj[`${key}`] = value;
      }
    }
  } catch (Error) {
    console.log("[*] Default Query");
  }

  console.log("Query:", query_obj);

  let filters = {};
  for (let key in query_obj) {
    filters[key] = key;
  }
  console.log("Filters:", filters);

  STUDENT_MODEL.find(query_obj)
    .then((data) => {
      if (data != null) {
        res.render("checkAtt", { data: data, filters: filters });
      } else {
        res.send("[!] Nothing to show");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("[*] rendering check attendance page");
});

module.exports = ROUTER;
