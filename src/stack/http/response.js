let http = require('http');
// 如何向客户端写入响应信息

let server = http.createServer(function(req, res) {
    console.log('request');
    // 在响应对象里设置状态码，原因短语，响应头
    res.setHeader('Content-Type', 'text/html');
    // 响应头是否已经发送过了
    console.log('headerSent1', res.headersSent);
    // writeHead一旦调用会立刻向客户端发送
    // res.writeHead(200, {
    //     "Content-Type": "text/html;charset=utf8"
    // });
    // 当调用writeHead或者调用write方法的时候才会向客户端发响应头
    // console.log('headerSent1', res.headersSent);
    res.statusCode = 404;
    res.sendDate = false; // Date响应头会默认设置，若不想要，可以设置为false
    res.setHeader('Content-Type', 'text/html;charset=utf8');  // 设置响应头
    console.log('getHeader1', res.getHeader('Content-Type')); // 获取响应头
    res.removeHeader('Content-Type'); // 删除响应头
    console.log('getHeader2', res.getHeader('Content-Type')); // 获取响应头
    res.write('hello');
    res.write('world');
    res.end();
});

server.on('connection', function(socket){
    console.log('connnection');
    socket.on('close', function() {
        console.log('close');
    });
    socket.on('end', function() {
        console.log('end');
    })
});

server.listen(8080); 