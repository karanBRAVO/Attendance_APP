const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const len = arr.length;
const CODE_LENGTH = 10;

function gen_code() {
    let code = "";
    for (let i = 0; i < CODE_LENGTH; i ++) {
        let rand_index = Math.floor(Math.random() * 36);
        code += arr[rand_index];
    }
    return code;
}

module.exports = gen_code;
