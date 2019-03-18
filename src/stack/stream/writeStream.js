let fs = require('fs');
let path = require('path');
let WriteStream = require('./WriteStreamSource');

// let ws = fs.createWriteStream(path.join(__dirname, '2.txt'), {
//     flags: 'w',
//     encoding: 'utf8',
//     mode: 0o666,
//     autoClose: true,
//     start: 0,
//     highWaterMark: 3 // 最高水平线，指定了字节总数
// });

let ws = new WriteStream(path.join(__dirname, '2.txt'), {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 3 // 最高水平线，指定了字节总数
}); 

// 内部的缓冲小于创建的配置的highWaterMark，返回true
let flag = ws.write('0', 'utf8', ()=>{});
console.log(flag); // true

flag = ws.write('1', 'utf8', ()=>{});
console.log(flag); // true

// 若返回false,则应该停止向流写入数据
flag = ws.write('2', 'utf8', ()=>{});
console.log(flag); // 返回false，写完3时，缓冲区已达到highWaterMark：3时，表明缓存区满了

// 所有缓冲的数据块都被排空了，当达到highWaterMark时，表明缓存区满了，满了后被清空了才会触发drain
ws.on('drain', function() {
    console.log('drain');
    flag = ws.write('3', 'utf8', ()=>{});
    console.log(flag); // true
});    

// 可写流和可读流都会在内部的缓冲器中存储数据     

