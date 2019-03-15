/**
 * 以前的JS只需要处理字符
 * 如何实现进制的转换,表示的是同一个数，不同的表现形式
 */
let a = 0b10100; // 二进制20
console.log(a);

let b = 0o24; // 八进制20
console.log(b);

let c = 20; // 十进制

let d = 0x14; // 16进制20
console.log(d);

// 任意进制转十进制
console.log(parseInt('0x14', 16)); // 20

// 任意进制转二进制
console.log(d.toString(2)); // 10100 

