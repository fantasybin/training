const http = require('http');
const url = require('url');

const workDir = path.resolve('.');
console.log(workDir);

console.log(path.join(workDir, 'static', 'index.html'));

const server = http.createServer(function(request, response){
    console.log(request.method + ': ' + request.url);
    console.log(url.parse(request.url));

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>Hello world!</h1>');
});

server.listen(8089);
console.log('Server is running at http://localhost:8089');