const head_login_form = document.getElementById("head_login_form");
const userName = document.getElementById("userName");
const dateTime = document.getElementById("dateTime");
const userPass = document.getElementById("userPass");
const userT_id = document.getElementById("userT_id");
const showPasswordBtn = document.getElementById("showPasswordBtn");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  let user_name = String(userName.value);
  let data_time = String(dateTime.value);
  let user_pass = String(userPass.value);
  let user_id = String(userT_id.value);

  if (user_name.length > 0 && data_time.length > 0 && user_pass.length >= 6 && user_id.length > 0) {
    head_login_form.action = "/head-login/handle-post/login";
    head_login_form.method = "post";
  } else {
    alert("Please fill the form correctly");
    head_login_form.action = "/head-login";
    head_login_form.method = "get";
  }
});

showPasswordBtn.addEventListener("click", () => {
  if (userPass.type == "text") {
    userPass.type = "password";
  } else {
    userPass.type = "text";
  }
});
