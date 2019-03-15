/*
** 判断变量的类型
*/
function isType(type) {
    return function (param) {
        return Object.prototype.toString.call(param) === `[object ${type}]`;
    }    
}

// 注意写的type首字母为大写
let stringType = isType('String');
console.log(stringType('123'));