/**
 * 1.可以用来检验要下载的文件是否被改动过
 * 2.对密码进行加密 123456 -> md5值
 */
let crypto = require('crypto');
let str = 'hello';
console.log(crypto.getHashes());

// [ 'RSA-MD4',
//   'RSA-MD5',
//   'RSA-MDC2',
//   'RSA-RIPEMD160',
//   'RSA-SHA1',
//   'RSA-SHA1-2',
//   'RSA-SHA224',
//   'RSA-SHA256',
//   'RSA-SHA384',
//   'RSA-SHA512',
//   'blake2b512',
//   'blake2s256',
//   'md4',
//   'md4WithRSAEncryption',
//   'md5',
//   'md5-sha1',
//   'md5WithRSAEncryption',
//   'mdc2',
//   'mdc2WithRSA',
//   'ripemd',
//   'ripemd160',
//   'ripemd160WithRSA',
//   'rmd160',
//   'sha1',
//   'sha1WithRSAEncryption',
//   'sha224',
//   'sha224WithRSAEncryption',
//   'sha256',
//   'sha256WithRSAEncryption',
//   'sha384',
//   'sha384WithRSAEncryption',
//   'sha512',
//   'sha512WithRSAEncryption',
//   'ssl3-md5',
//   'ssl3-sha1',
//   'whirlpool' ]

let md5 = crypto.createHash('sha1');
md5.update('sssssssss');
md5.update('world');
console.log(md5.digest('hex'));
// 9b79340adee94c1405a845f929a2ea1711e226fd 32位

/**
 * 其实有这一个应用场景，当客户端访问服务器的时候，服务器有可能会返回一个响应头Content-Md5
 * 这个值就是响应体的MD5值
 */