let {Transform} = require('stream');

// 转换流，参数与可写流一样，实现数据转换的
let transform = Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase()); // 将输入的内容放入到可读流中
        callback();
    }
});

let transform2 = Transform({
    transform(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

process.stdin.pipe(transform).pipe(transform2);  