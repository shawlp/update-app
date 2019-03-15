// node自带的http模块
var http = require('http');

http.createServer(function(request, response) {
    console.log('request', request);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello world\n')
}).listen(8888);

console.log('Server runnning at http://127.0.0.1:8888/');

