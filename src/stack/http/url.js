let url = require('url');
let str = 'http://user@pwd@localhost:8080/user?id=5#top';

// 若第二个参数为true，query为一个对象
let urlObj = url.parse(str, true);
// console.log(typeof urlObj, urlObj); 
console.log(url.format(urlObj)); // http://user%40pwd@localhost:8080/user?id=5#top