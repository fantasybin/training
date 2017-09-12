var express =  require('express');
var path = require('path');
var compression = require('compression');

var app = express();
app.use(compression());

// 通过 Express 托管静态资源，比如 index.css
// 访问静态资源文件时，express.static 中间件会根据目录查找所需的文件
app.use(express.static(path.join(__dirname, 'public')));

//设置路由规则
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
console.log('node start');

//启动服务器
var PORT = process.env.PORT || 8888;
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT);
});