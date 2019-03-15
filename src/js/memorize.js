// 函数记忆是指将上次的计算结果缓存起来，当下次调用时，直接返回缓存中的数据
function memorize(f) {
    let cache = {};
    return function() {
        let key = arguments.length + Array.prototype.join.call(arguments, ',');
        if (key in cache) {
            return cache[key]
        } else {
            return cache[key] = f.apply(this, arguments);
        }
    }
}

// underscore: hasher自定义存储的key值
function memorize1(func, hasher) {  
    let memorize = function(key) {
        let cache = memorize.cache;
        let address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!cache[address]) {
            cache[address] = func.apply(this, arguments);    
        }
        return cache[address];
    };
    memorize.cache = {};
    return memorize;  
}