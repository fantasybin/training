const fs = require('fs');
const path = require('path');

console.info('-----------fs star--------------')


fs.appendFile('./fs/sample.txt', 'data to append', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });


fs.readFile('./fs/sample.txt', 'utf-8', function (err, data) {
    if(err) {
        console.info(err);
    } else {
        console.info(data);
    }
})
//fs.mkdirSync('./scripts')
console.info('__dirname :' + __dirname);
console.info('process.cwd: ' +process.cwd())
fs.open(process.cwd()  + '/scripts/index.js', 'a+', (err, fd) =>{
    console.info(err, fd);
})

console.log('process.cwd: ' + process.cwd());
const appDirectory = fs.realpathSync(process.cwd());
console.log(appDirectory);

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
console.log(resolveApp('src/html'));
console.log(resolveApp('src/scripts/entry/index.js'));

const cwd = process.cwd();
console.log(path.join(cwd, 'node_modules'));
console.log(path.join(cwd, 'src', 'dll'));

console.info(process.env);
console.log(process.env.PORT);

console.info('-----------fs end--------------')