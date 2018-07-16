const fs = require('fs');

console.info('-----------fs star--------------')

var data = fs.readFileSync('fs/sample.txt', 'utf-8');
console.log(data);

console.info('-----------fs end--------------')