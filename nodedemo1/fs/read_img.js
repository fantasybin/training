'use strict';

// read from 'sample.png'

const fs = require('fs');

console.log('>>> BEGIN >>>')

fs.readFile('fs/jingangjing.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        var text = data.toString('utf-8');
        console.log(text);
        console.log(data.length + ' bytes');
    }
});

console.log('>>> END >>>')