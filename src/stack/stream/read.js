let {Readable} = require('stream');

// 想实现什么流 就继承这个流
// Readable里面有一个read方法，默认调_read
// Readable中提供了一个push方法，调用push方法就会默认调用data事件
let index = 9;
class MyRead extends Readable {
    _read() {
        if (index-->0) return this.push('123');
        // 可读流当push null的时候停止
        this.push(null);
    }
}
let mr = new MyRead();
mr.on('data', (data)=>{
    console.log(data.toString());
})