// parse方法解析请求对象，其实就是请求信息，然后解析出请求头，再传给监听函数
let fs = require('fs');
let path = require('path');
let {StringDecoder} = require('string_decoder');

// 字符串解码器，默认为utf8，把buffer转为字符串
let decoder = new StringDecoder();   

// 流：读一点少一点
let rs = fs.createReadStream(path.join(__dirname, 'req.txt'));

function parser(requestStream, requestListener) {
    function onReadable() {
        let buf;
        let buffers = [];
        while(null != (buf = requestStream.read())) {
            buffers.push(buf);
            let result = Buffer.concat(buffers);
            let str = decoder.write(result);
            if (str.match(/\r\n\r\n/)) {
                let values = str.split(/\r\n\r\n/);
                let headers = values.shift();
                let headerObj = parseHeader(headers);
                Object.assign(requestStream, headerObj);
                let body = values.join('\r\n\r\n');
                requestStream.removeListener('readable', onReadable);
                requestStream.unshift(Buffer.from(body));
                return requestListener(requestStream);
            }
        }
    }
    requestStream.on('readable', onReadable);
}

function parseHeader(headerStr) { 
    let lines = headerStr.split(/\r\n/);
    let startLine = lines.shift();
    let starts = startLine.split(' ');
    let method = starts[0];
    let url = starts[1];
    let protocal = starts[2];
    let protocalName = protocal.split('/')[0];
    let protocalVersion = protocal.split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return { headers, method, url, protocalName, protocalVersion };
}

parser(rs, function(req) {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    req.on('data', function(data) {
        console.log(data.toString());
    });
    req.on('end', function(){
        console.log('end');
    })    
})


// POST
// /User
// { Host: 'localhost:8080',
//   'User-Agent': 'curl/7.53.0',
//   Accept: '*/*',
//   'Content-Length': '15',
//   'Content-Type': 'application/x-www-form-urlencoded' }
// name=zfpx&age=9

// like=girl

// like=girl2
// end