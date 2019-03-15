let fs = require('fs');
let path = require('path');

function stripBOM(content) {
    if (Buffer.isBuffer(content)) {
        if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
            return content.slice(3)
        }
        return content;
    } else {
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        return content;
    }
}

let result = fs.readFileSync(path.join(__dirname, './1.txt'), 'utf8');
result = stripBOM(result); 
console.log('result', result.toString());

// iconv-lite:解析其他编码的
let iconv = require('iconv-lite');
let r1 = fs.readFileSync(path.join(__dirname, './2.txt'));
r1 = iconv.decode(r1, 'gbk');
console.log(r1.toString());


let buffer = Buffer.from('珠峰之巅');
let buff1 = buffer.slice(0, 3);
let buff2 = buffer.slice(3);
let {StringDecoder} = require('string_decoder');
let sd = new StringDecoder();
console.log(sd.write(buff1).toString()); // 珠
console.log(sd.write(buff2).toString()); // 峰之巅