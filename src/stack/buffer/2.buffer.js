// 拷贝
let buf1 = Buffer.from('珠峰');
// console.log(buf1); // <Buffer e7 8f a0 e5 b3 b0>

let buf2 = Buffer.alloc(3);
Buffer.prototype.copy2 = function(targetBuffer, targetStart, sourceStart, sourceEnd) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i];
    }
}
buf1.copy2(buf2, 0, 0, 3);
// console.log(buf2.toString());

// concat连接buffer
let buf3 = Buffer.from('珠');
let buf4 = Buffer.from('峰');
Buffer.concat2 = function(list, total = list.reduce((len, item) => len+item.length, 0)){
    if (list.length == 1) {
        return list[0];
    } 
    let result = Buffer.alloc(total);
    let index = 0;
    for (let buf of list) {
        for (let b of buf) {
            if (index >= total) {
                return result;
            } else {
                result[index++] = b;
            }
        }
    }
    return result;
} 
let result = Buffer.concat2([buf3, buf4]);
console.log(result.toString());  