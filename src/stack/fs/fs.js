let fs = require('fs');
let path = require('path');

// 读取文件内容
// console.log(path.join(__dirname, '1.txt')); // f:\study\update-app\src\stack\fs\1.txt
// fs.readFile(path.join(__dirname, '1.txt'), {flag: 'r'}, function(err, data) {
//     if (err) console.error(err) 
//     console.log(data.toString()); // data: <Buffer 31 32 33 34 35 36 37 38 39 30> -> 1234567890
// });

// 往文件写内容
// mode权限：0o666表示可读可写
fs.writeFile('./2.txt', 'hello', {mode: 0o666}, function(err) {
    console.log(err);
})