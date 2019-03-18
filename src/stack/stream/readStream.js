// node提供了多种流对象,如HTTP服务器的请求和process.stdout
// 流是可读的，可写的，或者可读可写的，所有的流都是EventEmitter的实例

let fs = require('fs');
let path = require('path');
let ReadStream = require('./ReadStreamSource');

// let rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
//     flags: 'r', // 读取操作
//     encoding: 'utf8', // 默认为null，null代表的返回buffer
//     autoClose: true, // 读取完自动关闭
//     highWaterMark: 3, // 默认是64k, 64*1024b
//     start: 3, // 从第3个字节开始读取
//     end: 8 // 包括索引8
// });
let rs = new ReadStream(path.join(__dirname, '1.txt'), {
    flags: 'r', // 读取操作
    encoding: 'utf8', // 默认为null，null代表的返回buffer
    autoClose: true, // 读取完自动关闭
    highWaterMark: 3, // 默认是64k, 64*1024b
    start: 3, // 从第3个字节开始读取
    end: 8 // 包括索引8
}); 

// 也可以手动设置编码或者在options声明
// rs.setEncoding('utf8');

rs.on('open', function() {
    console.log('文件打开了');
});

// 当流或其底层资源被关闭时触发
rs.on('close', function() {
    console.log('文件关闭了');
});

rs.on('error', function(err) {
    console.log(err);
});

// 当流将数据块传送给消费者后触发
rs.on('data', function(data) {
    console.log('data', data);
    // 停止触发data事件，暂停读取
    rs.pause();
    setTimeout(function() {
        // 恢复读取，暂停模式（需显示调用stream.read（））切换为流动模式（数据自动从底层系统读取，并通过EventEmitter接口的事件尽可能快的被提供给应用程序）
        rs.resume();
    }, 1000);
});

// 表明流有新动态，要么有新的数据，要么到达流的尽头，若同时使用data事件，当调用rs.read方法才会触发data事件
// rs.on('readable', function() {
//     console.log('readable data', rs.read());
// });

// 流中无数据时或者读取数据完毕触发
rs.on('end', function() {
    console.log('end');
});

// 文件打开了
// data 456
// data 789
// end
// 文件关闭了 
