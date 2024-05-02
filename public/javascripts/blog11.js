
const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateRandomWord(length) {
    let word = '';
    for (let i = 0; i < length; i++) {
        word += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
    return word;
}