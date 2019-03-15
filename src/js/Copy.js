// 浅拷贝: 若元素是基本类型，就会拷贝一份，互不影响,若是引用类型:对象或者数组，就只会拷贝引用，其中一处改变，另外一处也会相应的改变
// 深拷贝:  完全的拷贝一个对象，可理解为被拷贝的对象与拷贝的对象所处的内存地址不一样

// 数组的浅拷贝: concat、slice
// 数组的深拷贝: JSON.parse(JSON.stringify(obj)),但不能拷贝函数

// shallowCopy
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

// deepCopy
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
} 

// deepCopy
var clone = function(origin) {
    let newObj = {};
    for (let key in origin) {
        if (typeof origin[key] === 'object') {
            newObj[key] = clone(origin[key]);
        } else {
            newObj[key] = origin[key];
        }
    }
    return newObj;
}