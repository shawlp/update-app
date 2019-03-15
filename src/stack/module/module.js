// 模块
// 核心模块，内置模块
// 内置模块就是不需要相对路径，可以直接引用 不需要下载 天生自带
// 文件模块，自定义模块 这个就是我们自己写的

/** 
 * 在node里模块的类型有3种
 * 1.JS模块
 * 2.json模块
 * 先找文件，读取文件内容，JSON.parse转成对象返回
 * 3.node C++扩展二进制模块
 * require('./user.json'),会先找user.如果找不到，会再找user.js,如果还找不到user.json,如果还找不到user.node
 */

let fs = require('fs');

// 解决路径问题
let path = require('path');

// console.log(__dirname); // f:\study\update-app\src\stack\module

// 给个文件名，按照当前的路径，拼出一个绝对路径
// console.log(path.resolve(__dirname, 'a')); // f:\study\update-app\src\stack\module\a

console.log(path.join(__dirname, 'a')); // join就是拼路径用的 可以传递多个参数

console.log(path.basename('a.js', '.js')); // 获取除了后缀的名字

console.log(path.extname('a.min.js')); // 获取后缀名

// 为了不写死，可以自动根据不同的操作系统变换
console.log(path.posix.delimiter); // :

console.log(path.sep); // window \ linux /

// vm虚拟机 模块
let vm = require('vm');
let a = 1;
vm.runInThisContext(`console.log(${a})`);




