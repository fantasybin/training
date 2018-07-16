var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

console.info(process.argv);
// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;

    var filepath = path.join(root, pathname);

    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            var stream = fs.createReadStream(filepath);
            console.info(stream);
            stream.pipe(response);
        } else if(stats.isDirectory()) {
            
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen('8089')