let http = require('http');
let server = http.createServer(function(req, res) {
    res.end("8000");
}).listen(8000);