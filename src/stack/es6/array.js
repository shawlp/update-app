let arr1 = [24, 56, 88, 90, 5];
//filter返回true，此元素保留在新数组，返回false则删除
Array.prototype.filter = function(fn) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        let result = fn(this[i]);
        if (result) {
            newArr.push(this[i]);
        }
    }
    return newArr;          
};

let result1 = arr1.filter(function(item){
    return item > 50
});

console.log('result1', result1);

// map reduce reduceRight filter forEach
// some find findIndex every

// 要求每一个元素都满足要求
Array.prototype.every = function(fn) {
    let flag = true;
    for (let i = 0; i < this.length; i++) {
        let result = fn(this[i]);
        if (!result) {
            flag = false;
        }
    }
    return flag;
}

let result2 = arr1.every((item) => item > 20);
console.log('result2', result2);

Array.prototype.some = function(fn) {
    for (let i = 0; i < this.length; i++) {
        let result = fn(this[i]);
        if (result) {
            return result;
        }
    }
    return false;
}

let result3 = arr1.some((item) => item > 20);
console.log('result3', result3);

Array.prototype.find = function(fn) {
    for (let i=0; i < this.length; i++) {
        let flag = fn(this[i]);
        if (flag) {
            return this[i];
        }
    }
}

Array.prototype.findIndex = function(fn) {
    for (let i=0; i < this.length; i++) {
        let flag = fn(this[i]);
        if (flag) {
            return i;
        }
    }
}