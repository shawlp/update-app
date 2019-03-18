let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
    highWaterMark: 3,
    flags: 'r',
    autoClose: true,
    encoding: 'utf8',
    start: 0
});

// 当我只要创建一个流 就会先把缓存区填满，等待着自己消费
// 如果当前缓存区被清空后会再次触发readable事件
// 当你消费小于最高水位线时，会自动添加highWaterMark这么多数据
// rs.on('readable', () => {
//     let result = rs.read(1);
//     console.log(rs._readableState.length); // 缓存区的个数
//     setTimeout(()=>{
//         console.log(rs._readableState.length);
//     }, 1000);
// }); 

// 默认会先读满
// 当缓存区为空时 会默认再次触发readable事件
// 不满缓存区就再去读取
rs.on('readable', () => {
    // 想读5个，可highWaterMark为3，会更改缓存区的大小再去读取
    let result = rs.read(5);
    console.log(result);
})

// null
// 12345
// 67890