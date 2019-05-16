let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));
// 密码123 加盐算法
let hmac = crypto.createHmac('sha1', key);
hmac.update('123');
let result = hmac.digest('hex');
console.log(result);
// 45731c65195f08fe0dae73e72a97f8dafc10f34d