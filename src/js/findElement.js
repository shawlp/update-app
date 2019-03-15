// 在数组中查找指定元素

// 顺序查找
function findIndex(array, predict, context) {
    for (let i = 0; i < array.length; i++) {
        if (predict.call(context, array[i], i, array)) return i;
    }
    return -1;
}

console.log(findIndex([1, 2, 3, 4], function(item, i, array) {
    if (item === 3) return true;
}))

// 倒序查找
function findLastIndex(array, predict, context) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (predict.call(context, array[i], i, array)) return i;
    }
}

console.log(findLastIndex([4, 1, 2, 3], function(item, i, array) {
    if (item === 2) return true;
}))

function cb(func, context) {
    if (context === void 0) return func;
    return function() {
        return func.apply(context, arguments);
    }
}

function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    let low = 0, high = array.length;
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
        else high = mid;
    }
    return high;
}

var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

// 查找插入的位置
var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
    return stooge.age
});  
