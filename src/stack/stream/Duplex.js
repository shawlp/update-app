let {Duplex} = require('stream');

// 双工流，既能读又能写，而且读写没关系(互不干扰)
let d = Duplex({
    read() {
        this.push('hello');
        this.push(null);
    },
    write(chunk, encoding, callback){
        console.log('write', chunk.toString());
        callback();
    }
});

d.on('data', (data) => {
    console.log('data', data.toString()); // 'hello'
});

// d.read(); // 触发data事件

d.write('hello shaw', 'utf8', () => {
    console.log('写入完毕！')
}) 