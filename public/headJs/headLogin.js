const head_login_form = document.getElementById("head_login_form");
const userName = document.getElementById("userName");
const dateTime = document.getElementById("dateTime");
const userId = document.getElementById("userId");
const showPasswordBtn = document.getElementById("showPasswordBtn");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  let user_name = String(userName.value);
  let data_time = String(dateTime.value);
  let user_id = String(userId.value);

  if (user_name.length > 0 && data_time.length > 0 && user_id.length >= 6) {
    head_login_form.action = "/head-login/handle-post/login";
    head_login_form.method = "post";
  } else {
    alert("Please fill the form correctly");
    head_login_form.action = "/head-login";
    head_login_form.method = "get";
  }
});

showPasswordBtn.addEventListener("click", () => {
  if (userId.type == "text") {
    userId.type = "password";
  } else {
    userId.type = "text";
  }
});
