let http = require('http');
// 解析和格式化URL查询字符串
let querystring = require('querystring');
let server = http.createServer();

server.on('request', function(req, res){
    console.log(req.url);
    console.log(req.method);
    let result = [];
    req.on('data', function(data){
        result.push(data);
    });
    req.on('end', function(){
        let str = Buffer.concat(result).toString();
        let contentType = req.headers['content-type'];
        let body;
        if (contentType == 'application/x-www-form-urlencoded') {
            body = querystring.parse(str);
        } else if (contentType == 'application/json') {
            body = JSON.parse(str);
        } else {
            body = querystring.parse(str);
        }
        res.end(JSON.stringify(body));
    });
});

server.listen(8080);