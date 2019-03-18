let fs = require('fs');
let path = require('path');
let ReadStream = require('./ReadStreamSource');
let WriteStream = require('./WriteStreamSource');

let rs = new ReadStream(path.join(__dirname, './1.txt'), {
    highWaterMark: 4
});

let ws = new WriteStream(path.join(__dirname, './2.txt'), {
    highWaterMark: 1
});

// 管道：先用可读流读出数据，再通过管道使用可写流把数据写入文件中
rs.pipe(ws); // 读一点写一点