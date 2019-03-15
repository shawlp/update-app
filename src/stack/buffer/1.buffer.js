//buffer:js读取或操作二进制数据流的机制，用于在TCP流或文件系统等场景中处理字节流
// 创建一个长度为6，且用2填充的Buffer,默认0
let buf1 = Buffer.alloc(6, 2);
// console.log(buf1); // <Buffer 02 02 02 02 02 02>

// 分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(6); // <Buffer 28 2e 10 02 00 00>
// console.log(buf2);

let buf3 = Buffer.from('珠峰');
// console.log(buf3); // <Buffer e7 8f a0 e5 b3 b0>

let buf4 = Buffer.alloc(6);
// console.log(buf4);

buf4.fill(3, 1, 3); // 填充的值，填充的开始索引，填充的结束索引
console.log(buf4); // <Buffer 00 03 03 00 00 00>

buf4.write('珠峰', 0, 3, 'utf8'); // 填充的值，填充的开始索引,填充的字节长度，编码
console.log(buf4.toString()); // 珠

buf4.write('峰', 3, 3, 'utf8');

console.log(buf4.toString()); // 珠峰

let buf5 = Buffer.alloc(6);
// 向指定的索引写入一个8位的整数，也就是占用一个字节的整数
buf5.writeInt8(0, 0);
buf5.writeInt8(16, 1);
buf5.writeInt8(32, 2);
console.log(buf5); // <Buffer 00 10 20 00 00 00>

let buf6 = Buffer.alloc(4);
buf6.writeInt16BE(256, 0);
console.log(buf6);

let buf7 =Buffer.alloc(6, 1);
let buf8 = buf7.slice(2, 6);
console.log(buf8);

buf8.fill(4);
console.log(buf7); // <Buffer 01 01 04 04 04 04>

/**
 * string_decoder
 * 它的出现是为了解决乱码问题
 */
let buf9 = Buffer.from('珠峰培训');
let buf10 = buf9.slice(0, 5);
let buf11 = buf9.slice(5, 7);
let buf12 = buf9.slice(7);

let {StringDecoder} = require('string_decoder');
let sd = new StringDecoder();
// write就是读取buffer的内容，返回一个字符串
// write的时候会判断是不是一个字符，如果是的话就输出，不是的话就缓存在对象内部，等下次再write的时候会把前面缓存的字符加到第二次write的buff上再进行判断。
console.log(sd.write(buf10)); // 珠
console.log(sd.write(buf11)); // 峰
console.log(sd.write(buf12)); // 培训




