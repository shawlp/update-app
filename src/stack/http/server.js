// http服务器是继承自tcp服务器的，http协议是应用层协议，是基于TCP的
let http = require('http');
let server = http.createServer();
let url = require('url');
// 当客户端连接上服务器之后执行回调
server.on('connection', function(socket){
    console.log('客户端连接');
});

// req:可读流
// res:可写流
// 可以多次发送请求，每次请求都会触发request事件
// 服务器监听客户端的请求，当有请求到来的时候执行回调
/**
> POST / HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.53.0
> Accept: *
> Content-Length: 9
> Content-Type: application/x-www-form-urlencoded
>
} [9 bytes data]
 */
// req代表客户端的连接，server服务器把客户端的请求信息进行解析，然后放在req上
// res代表响应，如果希望向客户端回复消息，需要通过res
server.on('request', function(req, res){    
    console.log(req.method);
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname);
    console.log(query); // 将get请求?后面的参数转为对象
    console.log(req.url); // 获取请求路径
    console.log(req.headers); // 获取请求头
    let result = [];
    req.on('data', function(data){
        result.push(data);
    });
    req.on('end', function(){
        let r = Buffer.concat(result);
        console.log(r.toString());

        res.end(r);
    })
});

server.on('close', function(req, res) {
    console.log('服务器关闭');
});

server.on('error', function(err) {
    console.log('服务器错误');
});

server.listen(8080, function() {
    console.log('server started at http://localhost:8080');
});





