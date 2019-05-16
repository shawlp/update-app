let http = require('http');
// 头分4种 通用头 请求头 响应头 实体头
let options = {
    host: 'localhost',
    port: 8080,
    method: 'POST',
    headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

let req = http.request(options);

req.on('response', function (res) {
    console.log(res.statusCode);
    console.log(res.headers);
    let result = [];
    res.on('data', function(data){
        result.push(data);
    });
    res.on('end', function(){
        let str = Buffer.concat(result);
        console.log(str.toString());
    });    
});

// 向请求体里写数据
// req.write('{"name":"zfpx"}');
req.write('name=shaw&age=9');
// 结束写入请求体，只有在调用end的时候才会真正向服务器发请求
req.end();