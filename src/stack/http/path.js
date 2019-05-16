let path = require('path');
let str = '/a/b/c/a.jpg';
// 取得文件的名字
console.log(path.basename(str, '.jpg')); // a
// 取得文件的后缀
console.log(path.extname(str)); // .jpg