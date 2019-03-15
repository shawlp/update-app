/**
 * 使用reduce实现累加
 */
let arr = [1, 2, 3, 4];
// val保存累加的值，第二个参数为0表明累加的初始值为0
let result = arr.reduce((val, item, index, arr) => {
    return val + item;
}, 0);