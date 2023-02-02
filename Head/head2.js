const getCodeBtn = document.getElementById("getCodeBtn");
const numberOfStudents = document.getElementById("numberOfStudents");
const alertBox = document.getElementById("alertBox");
const alertBoxBg = document.getElementById("alertBoxBg");
const alertSpan = document.getElementById("alertSpan");
const showCodeCont = document.getElementById("showCodeCont");
const showCodeSpan = document.getElementById("showCodeSpan");
const copyToClipboardBtn = document.getElementById("copyToClipboardBtn");

let code = undefined;

getCodeBtn.addEventListener('click', () => {
    let numOfStud = Number(getNumberOfStudents());
    if (numOfStud >= 1) {
        code = getCode();
        let text = `code is generated successfully. share it with students`;
        getalerts(text, 'yellowgreen');
        setTimeout(hidealerts, 2000);
        showCodeContainer(`code ~ ${code}`);
    }
    else {
        let text = "Number of students should be greater than or equal to 1.";
        getalerts(text, 'crimson');
        setTimeout(hidealerts, 2000);
    }
})

function getNumberOfStudents() {
    return numberOfStudents.value;
}

function getCode(lengthOfCode = 10) {
    let code = undefined;
    if (lengthOfCode >= 8) {
        if (lengthOfCode > 12) {
            lengthOfCode = 12;
        }
        for (let i = 0; i < lengthOfCode; i++) {
            if (code == undefined) {
                code = `${Math.trunc(Math.random() * 10)}`;
            }
            else {
                code = code + `${Math.trunc(Math.random() * 10)}`;
            }
        }
    }
    return code;
}

function getalerts(text, color) {
    alertSpan.innerHTML = `${text}`;
    alertBoxBg.style.background = `${color}`;
    alertBoxBg.style.border = `2px solid ${color}`;
    alertBox.style.display = 'flex';
}

function hidealerts() {
    alertBox.style.display = 'none';
}

function showCodeContainer(text) {
    showCodeSpan.innerHTML = text;
    showCodeCont.style.display = 'flex';
}

copyToClipboardBtn.addEventListener("click", () => {
    if (code != undefined) {
        navigator.clipboard.writeText(code);
        getalerts('code copied', 'black');
        setTimeout(hidealerts, 2000);
    }
})
