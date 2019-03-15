function eq(a, b) {
    // +0不等于-0
    if (a === b) return a !== 0 || 1/a === 1/b;

    // js中NaN不等于NaN
    if (a !== a) return b!== b;

    if (a == null || b == null) return false;

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    let type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b);
}

function isFunction(obj) {
    return toString(obj) === '[object Function]';
}

let toString = Object.prototype.toString;
function deepEq(a, b) {
    let className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch(className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === b + '';
        case '[object Number]':
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }
    
    let areArrays = className === '[object Array]';
    if (!areArrays) {
        if (typeof a !== 'object' || typeof b !== 'object') return false;

        let aCtor = a.constructor, bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }

    // 判断数组
    if (areArrays) {
        let length = a.length;
        if (length !== b.length) return false;

        while(length--) {
            if (!eq(a[length], b[length])) return false;
        }
    } else {
        let keys = Object.keys(a), key;
        let length = keys.length;
        if (length !== Object.keys(b).length) return false;

        while(length--) {
            key = keys[length];
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key]))) return false;
        }
    }
}  
