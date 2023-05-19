function getCode() {
    const length = 10;
    let code = "";
    for (let i = 0; i < length; i++) {
        code += String(Math.trunc(Math.random() * 10));
    }
    return code;
}

module.exports = getCode;
