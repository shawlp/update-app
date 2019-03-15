let class2Type = {};

"Boolean Number String Function Array Date RegExp Object Error".split(" ").map((item, index) => {
    class2Type[`[object ${item}]`] = item.toLowerCase();
});

// 判断对象的类型
function type(obj) {
    if (obj == null) {
        return obj + ''
    }
    return typeof obj === "object" || typeof obj === "function" ? 
        class2Type[Object.prototype.toString.call(obj)] || "object" : typeof obj;    
}

// 判断对象是否是函数
function isFunction(obj) {
    return type(obj) === 'function';
}

// 判断是否是空对象
function isEmptyObject(obj) {
    let name;
    for(name in obj) {
        return true;
    }
    return false;
}

// window对象
function isWindow(obj) {
    return obj !== null && obj === obj.window;
}  
   
// 是否是dom元素
function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
} 



