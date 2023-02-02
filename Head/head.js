const startSessionBtn = document.getElementById("startSessionBtn");
const userName = document.getElementById("userName");
const dateTime = document.getElementById("dateTime");
const userId = document.getElementById("userId");
const ShowPassword = document.getElementById("ShowPassword");

let myObj = {
    name: "karan",
    id: "00000000"
}

startSessionBtn.addEventListener('click', () => {
    let name = getUserName();
    let selDate = getSelectedDate();
    let id = getId();

    if (selDate.length == 0) {
        let date = new Date();
        selDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} `
    }

    if (name === myObj.name && id === myObj.id) {
        console.log('successfully started the session');
    }
})

function getUserName() {
    let name = String(userName.value);
    return name;
}

function getSelectedDate() {
    let selDate = String(dateTime.value);
    return selDate;
}

function getId () {
    let id = String(userId.value);
    return id;
}

ShowPassword.addEventListener('click', () => {
    show_hide_pass();
})

function show_hide_pass() {
    if (userId.type == 'password') {
        userId.type = 'text';
    }
    else {
        userId.type = 'password';
    }
}

