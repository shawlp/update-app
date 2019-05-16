let http = require('http');
let parse = require('user-agent-parser');
let server = http.createServer(function (req, res) {
    let userAgent = req.headers['user-agent'];
    console.log(userAgent);
    let userAgentObj = parse(userAgent);
    console.log('userAgentObj', userAgentObj);
    res.end(JSON.stringify(userAgentObj));
});
server.listen(8080);

// {
//     "browser": {
//         "name": "Chrome",
//         "version": "73.0.3683.86",
//         "major": "73"
//     },
//     "engine": {
//         "name": "WebKit",
//         "version": "537.36"
//     },
//     "os": {
//         "name": "Windows",
//         "version": "7"
//     },
//     "device": {},
//     "cpu": {
//         "architecture": "amd64"
//     }
// }  