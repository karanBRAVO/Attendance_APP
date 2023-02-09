const stdName = document.getElementById("stdName");
const stdNameLabel = document.getElementById("stdNameLabel");
const stdId = document.getElementById("stdId");
const stdIdLabel = document.getElementById("stdIdLabel");
const code = document.getElementById("code");
const codeLabel = document.getElementById("codeLabel");
const stdPass = document.getElementById("stdPass");
const stdPassLabel = document.getElementById("stdPassLabel");

function floatingLabel(inputField, label) {
    inputField.onfocus = () => {
        label.style.transform = `translateY(-11px)`;
        label.style.fontSize = `0.9em`;
        label.style.color = `grey`;
    }

    inputField.onblur = () => {
        if (inputField.value.length == 0) {
            label.style.transform = `translateY(0px)`;
            label.style.fontSize = `1em`;
            label.style.color = `black`;
        }
    }
}

floatingLabel(stdName, stdNameLabel);
floatingLabel(stdId, stdIdLabel);
floatingLabel(code, codeLabel);
floatingLabel(stdPass, stdPassLabel);