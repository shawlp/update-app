// 数组的扁平化，就是将一个嵌套多层的数组转换为只有一层的数组

// 递归
function flatten1(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten1(arr[i]))
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

// 纯数字
function flatten2(arr) {
    return arr.toString().split(',').map((item, index) => +item);
}

// reduce
function flatten3(arr) {
    return arr.reduce((prev, next, index, arr) => {
        return prev.concat(Array.isArray(next) ? flatten3(next) : next);
    },[]);
}     