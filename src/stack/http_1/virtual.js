/**
 * 弹性计算云服务器 ECS 就一个完整的服务器
 * 虚拟主机 你得到只是此服务器的一个目录
 */
let http = require('http');
let proxyServer = require('http-proxy');
let ps = proxyServer.createProxyServer();
let config = {
    'shawlp.com': 'http://localhost:8000',
    'hu.com': 'http://localhost:9000'
};

// nginx核心功能，反向代理
let server = http.createServer(function(req, res) {
    let host = req.headers['host'];
    let target = config[host];
    if (target) {
        ps.web(req, res, {
            target
        });
    } else {
        res.end(host);
    }
}).listen(8080);