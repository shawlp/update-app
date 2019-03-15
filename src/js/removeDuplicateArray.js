// 数组去重

// 双层循环 [1, '1', 1, '1'] => [1, '1']
function unique1(array) {
    let arr = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (array[i] === arr[j]) {
                break;
            }
        }
        if (j === arr.length) {
            arr.push(array[i]);
        }
    }
    return arr;
}

// indexOf
function unique2(array) {
    let arr = [];
    array.forEach((item) => {
        if (arr.indexOf(item) === -1) {
            arr.push(item);
        }
    });
    return arr;
}

// 排序后去重
function unique3(array) {
    let arr = [], seen;
    let sortedArray = array.concat().sort();
    for (let i = 0; i < sortedArray.length; i++) {
        // 首个元素push或者非首个元素与首个元素不等
        if (!i || seen !== sortedArray[i]) { 
            arr.push(sortedArray[i]);
        }
        seen = sortedArray[i];
    }
    return arr;
}

// indexOf或排序后去重
function unique4(array, isSorted) {
    let arr = [], seen;
    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        if (isSorted) {
            if (!i || seen !== array[i]) { 
                arr.push(array[i]);
            }
            seen = array[i];            
        } else if (arr.indexOf(value) === -1) {
            arr.push(value);
        }
    }   
    return arr; 
}

// filter
function unique5(array) {
    let arr = [];
    arr = array.filter((item, index, array) => {
        return array.indexOf(item) === index
    });
    return arr;
}

// es6,简化版:unique6 = (a) => [...new Set(a)]
function unique6(array) {
    return [...new Set(array)];
}

// object键值对:这种方法是利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的
function unique7(array) {
    let obj = {};
    return array.filter((item, index, array) => {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
    })
}

//for循环-对象和NaN不去重
//indexOf-对象和NaN不去重 
//sort-对象和 NaN 不去重 数字 1 也不去重
//filter + indexOf-对象不去重 NaN 会被忽略掉
//优化后的键值对方法-全部去重
// Set-对象不去重，NaN去重