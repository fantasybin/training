var msg = 'node';

function sayWord(word) {
    var word = word ? word : msg;
    var str = `Hello ${word}`;
    return str;
}

function calc(a,b) {
    return a + b;
}
module.exports = {
    sayWord,
    calc,
}