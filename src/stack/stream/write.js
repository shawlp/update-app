let {Writable} = require('stream');

// 可写流实现_write方法
// 源码中默认调用的是writable中的_write方法
class MyWrite extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
}

let mw = new MyWrite();
mw.write('珠峰1', 'utf8', ()=>{
    console.log(1);
});

mw.write('珠峰2', 'utf8', ()=>{
    console.log(2)
});