let {Transform} = require('stream');
let fs = require('fs');
let rs = fs.createReadStream('./user.json');

// 对象流:放的是对象，普通流里放的是buffer
let toJson = Transform({
    readableObjectMode: true, // 往可读流里放对象
    transform(chunk, encoding, cb){
        // 向可读流里的缓存区里放对象
        this.push(JSON.parse(chunk.toString()));
    }
});

let outJson = Transform({
    writableObjectMode: true, // 往可写流里放对象
    transform(chunk, encoding, cb){
        console.log(chunk);
        cb();
    }
});

rs.pipe(toJson).pipe(outJson);

// { name: 'shaw', age: 25 } 