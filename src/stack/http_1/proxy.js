let proxy = require('http-proxy');
let http = require('http');
let url = require('url');
let proxyServer = proxy.createProxyServer();

// 正向代理 帮助或代理局域网内的用户访问外网
// 反向代理 用来代理局域网内的服务器的

let server = http.createServer(function(req,res) {
    proxyServer.web(req, res, {
        target: 'http://localhost:9000'
    });
}).listen(8000);

// function web(req, res, options) {
//     let {pathname, port, host} = url.parse(req.url, true);
//     let opts = {
//         host,
//         port,
//         method: req.method,
//         path: pathname,
//         header: req.headers
//     };
//     opts.host = options.target;
//     http.request(opts, function (response) {
//         response.pipe(res);
//     });
// }