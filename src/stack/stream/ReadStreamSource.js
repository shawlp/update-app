let EventEmitter = require('events');
let fs = require('fs');

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path; // 传过来的路径
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true; // 是否自动关闭文件
        this.highWaterMark = options.highWaterMark || 64*1024; // 最高水位线
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || null;

        this.open(); // 打开文件，会有一个文件描述符
        this.flowing = null; // null为暂停模式
        // 看是否监听了data事件，如果监听了，就要变成流动模式

        this.buffer = Buffer.alloc(this.highWaterMark);
        this.pos = this.start; // pos读取的位置 可变 start不变
        this.on('newListener', (eventName, callback) => {
            if (eventName === 'data') {
                // 相当于用户监听了data事件，切换为流动模式
                this.flowing = true;
                // 读取文件
                this.read();
            }
        })
    }
    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', ()=>this.read());
        }
        let howMuchToRead = this.end ? Math.min(this.end-this.pos+1, this.highWaterMark) : this.highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                this.pos += bytesRead;
                let data = this.encoding ? this.buffer.slice(0, bytesRead).toString(this.encoding) : this.buffer.slice(0, bytesRead);
                this.emit('data', data);
                if (this.pos > this.end) {
                    this.emit('end');
                    this.destroy();
                }
                if (this.flowing) {
                    this.read();
                }
            } else {
                this.emit('end');
                this.destroy();
            }
        });
    }
    pipe(ws) {
        // 监听了data事件，切换为流动模式 
        this.on('data', (chunk) =>{
            let flag = ws.write(chunk);
            if (!flag) {
                this.pause();
            }
        });
        // 通过管道，把读取的数据全部写进目标文件
        ws.on('drain', ()=>{
            this.resume();
        });  
    }
    pause() {
        this.flowing = false;
    }
    resume() {
        this.flowing = true;
        this.read();
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) { // 是否自动关闭
                    this.destroy();
                }
            }
            this.fd = fd; // 文件描述符
            this.emit('open'); // 文件打开了
        });
    }
    destroy() { 
        if (typeof this.fd == 'number') {
            fs.close(this.fd, (err) => {
                this.emit('close'); // 关闭文件
            });
            return;
        }
        this.emit('close');
    }
}

module.exports = ReadStream;