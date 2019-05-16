/** 
 * 1.http服务器是继承自tcp服务器
 * 2.req和res都是从socket来的，先监听socket的data事件，然后等事件发生的时候，进行解析
 * 解析出请求头对象，再创建请求对象，再根据请求对象创建响应对象 
 */
let http = require('http');
let server = http.createServer();
server.on('request', function(req, res) {
    res.end('ok');
});
server.listen(8080);
