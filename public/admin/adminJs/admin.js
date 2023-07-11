const addUserForm = document.getElementById("addUserForm");
const addUsername = document.getElementById("addUsername");
const addUserDob = document.getElementById("addUserDob");
const addUserPassword = document.getElementById("addUserPassword");
const confirmPassword = document.getElementById("confirmPassword");
const addUserId = document.getElementById("addUserId");
const addUserButton = document.getElementById("addUserButton");

addUserButton.addEventListener("click", () => {
  let userName = String(addUsername.value);
  let userDob = String(addUserDob.value);
  let userPass = String(addUserPassword.value);
  let confPass = String(confirmPassword.value);
  let userId = String(addUserId.value);

  if (userName.length > 0 && userDob.length > 0 && userPass.length >= 6 && userId.length > 0) {
    if (userPass != confPass) {
      alert("Passwords are not matching");
      addUserForm.action = "/admin-dashboard";
      addUserForm.method = "get";
    } else {
      let confirmation = confirm("Do you want to add this user?");
      if (confirmation) {
        addUserForm.action = "/admin-dashboard/add-user";
        addUserForm.method = "post";
      } else {
        alert("Fill the form again");
        addUserForm.action = "/admin-dashboard";
        addUserForm.method = "get";
      }
    }
  } else {
    alert("Fill the valid details");
    addUserForm.action = "/admin-dashboard";
    addUserForm.method = "get";
  }
});
