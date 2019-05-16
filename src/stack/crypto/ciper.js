// 对称加密 加密和上面的摘要
let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let str = 'sddffffffffffffff@##$';
let pk = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));
let cipher = crypto.createCipher('blowfish', pk);
let result = cipher.update(str, 'utf8', 'hex');
result += cipher.final('hex');
console.log(result);
// 7ef99417f482eeeaf8a287ea5b4dad1f564cd429525b7b19

let decipher = crypto.createDecipher('blowfish', pk);
let r = decipher.update(result, 'hex', 'utf8');
r += decipher.final('utf8');
console.log(r); // sddffffffffffffff@##$