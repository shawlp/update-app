/** 
 * 如何把一个unicode码(16进制)转成utf8编码(二进制)
 * unicode中一个中文字符占2个字节，utf-8中一个中文占3个字节
 * Unicode符号范围     |        UTF-8编码方式
 (十六进制)        |              （二进制）
 ----------------------+---------------------------------------------
 0000 0000-0000 007F | 0xxxxxxx
 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 */

// let b = parseInt(0x4E07.toString(2));
// console.log(b); // 100 111000 000111

// 11100100 10111000 10000111
// console.log(0b11100100.toString(16)); // e4
// console.log(0b10111000.toString(16)); // b8
// console.log(0b10000111.toString(16)); // 87

// console.log(Buffer.from('万')); // <Buffer e4 b8 87>

function transfer(number) {
    /** 
     * 1.要判断0x4E07在哪个范围内
     */
    if (number < 0x7F) {
        return '0' + (number.toString(2).padStart(7,0));
    } else if (number < 0x7FF) {

    }

    let arr = ['1110', '10', '10'];
    let str =number.toString(2);
    arr[2] += str.substring(str.length-6);
    arr[1] += str.substring(str.length-12, str.length-6);
    arr[0] += str.substring(0,str.length-12).padStart(4, '0');

    let result = arr.join('');
    return parseInt(result, 2).toString(16);
}

let r = transfer(0x4E07);
console.log(r); // e4b887