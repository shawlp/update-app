let fs = require('fs');
let path = require('path');
let zlib = require('zlib');
console.log(process.cwd());
console.log(__dirname); 

// 用于实现压缩 transform转换流，继承自duplex双工流
function gzip(src) {
    fs.createReadStream(src)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(src + '.gz'));
}

// gzip(path.join(__dirname, 'msg.txt'));

// 解压
function gunzip(src) {
    fs.createReadStream(src)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz'))))
}

gunzip(path.join(__dirname, 'msg.txt.gz'));