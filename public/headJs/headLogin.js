const showPasswordBtn = document.getElementById("showPasswordBtn");
const userId = document.getElementById("userId");

showPasswordBtn.addEventListener("click", () => {
    (userId.type == "password") ? (userId.type = "text") : (userId.type = "password");
});
