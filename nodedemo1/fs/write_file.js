const fs = require('fs')
const path = require('path');

var data = 'hello node.js! ';
var root = process.cwd();
console.log(root + '/fs/sample.txt');
const filepath = path.resolve(root, 'fs/sample.txt');
fs.appendFile(filepath, data, function(err) {
    if(err){
        console.log(err);
    } else {
        console.log('write success');
        fs.readFile(root + '/fs/sample.txt', function(err,data) {
            if(err){
                console.log(err);
            } else {
                console.log(data.toString());
            }
        })
    }
})

fs.writeFileSync(filepath, data);

fs.stat(filepath, function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

fs.statSync(filepath, data)