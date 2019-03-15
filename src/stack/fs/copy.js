let fs = require('fs');
let path = require('path');

// function copy(source, target) {
//     // 先读取源文件，再把源文件数据写进目标文件
//     fs.readFile(path.join(__dirname, source), function(err, data){
//         if (err) console.error(err);
//         fs.writeFile(path.join(__dirname, target), data, {mode: 0o666}, function(err) {
//             console.error(err);
//         })
//     })
// }  

// copy('1.txt', '2.txt');

// fs.copyFile(path.join(__dirname, '1.txt'), path.join(__dirname, '2.txt'), function(){
//     console.log('拷贝成功！');
// });

// 标准输出
// process.stdout.write('hello world');

// 错误输出
// process.stderr.write('error');

// 读取9个长度:'123456789'
// let buffer = Buffer.alloc(9);
// fs.open(path.join(__dirname, '1.txt'), 'r', function(err, fd) {
//     fs.read(fd, buffer, 0, 9, 0, function(err, bytesRead, buff) {
//         console.log(err, bytesRead, buff.toString());
//     });
// }); 

// 
/** fd: 文件描述符 
 * 0:代表标准输入设备(键盘)
 * 1:标准输出设备(显示器)
 * 2：标准错误
 */
// fs.open(path.join(__dirname, '2.txt'), 'r+', 0o666, function(err, fd) {
//     console.log(fd);
//     fs.write(fd, Buffer.from('珠峰'), 0, 3, 3, function(err, bytesWritten, buffer) {
//         if(err) console.error(err);
//         console.log(bytesWritten, buffer.toString());
//     });
// });

// fs.open(path.join(__dirname, '2.txt'), 'w', function(err, fd) {
//     fs.write(fd, Buffer.from('珠峰'), 0, 6, 0, function(err, bytesWritten) {
//         // 当write方法触发了回调函数 并不是真正的文件被写入了 而是先把内容写到缓存区
//         // 强制将缓存区的内容 写入后关闭文件
//         fs.fsync(fd, function(){
//             fs.close(fd, function() {
//                 console.log('关闭');
//             })
//         });
//     });
// })

function copy(source, target) {
    let size = 3;
    let buffer = Buffer.alloc(3);
    fs.open(path.join(__dirname, source), 'r', function(err, rfd){
        fs.open(path.join(__dirname, target), 'w', function(err, wfd) {
            function next() {
                fs.read(rfd, buffer, 0, size, null, function(err, bytesRead) {
                    if (bytesRead > 0) {
                        fs.write(wfd, buffer, 0, bytesRead, null, function(err, byteWritten) {
                            setTimeout(() => {
                                next();
                            }, 1000);
                        })
                    } else {
                        fs.close(rfd, function(){});
                        fs.fsync(wfd, function(){
                            fs.close(wfd, function() {
                                console.log('关闭', '拷贝成功');
                            })
                        })
                    }
                })
            }
            next();
        })
    })
}

copy('1.txt', '2.txt');






