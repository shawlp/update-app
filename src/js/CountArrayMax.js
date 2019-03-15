// 计算数组的最大值

// 方法一: Math.max
function max1(arr) {
    let result = arr[0];
    for (let i = 0; i < arr.length; i++) {
        // result = Math.max(result, arr[i]);
        if (result < arr[i]) {
            result = arr[i];
        }
    }
    return result;
}

// 方法二
function max2(arr) {
    let result = 0;
    result = arr.reduce(function(prev, next) {
        if (prev < next) {
            result = next;
        } else {
            result = prev;
        }
        return result;
    })  
    return result;  
}

// 方法三: reduce
function max3(arr) {
    return arr.reduce(function(prev, next) {
        return Math.max(prev, next);
    })
}

// 方法四：sort
function max4(arr) {
    let sortedArr = arr.concat().sort((a, b) => a - b);
    return sortedArr[sortedArr.length - 1];
}

// 方法五：call/apply
function max5(arr) {
    // call-参数列表，apply-参数数组
    return Math.max.call(null, ...arr);
    // return Math.max.apply(null, arr);
}

// 方法6：es6
function max(arr) {
    return Math.max(...arr);
}

