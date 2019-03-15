let obj = require('./exports');

// require.cache是文件模块缓存
console.log(require.cache);

// 文件模块缓存和原生缓存不在一个地方
// 先在当前目录查找，找不到则一层一层往上找,如果还找不到最终会找全局node_modules
/** 
 * 'f:\\study\\update-app\\src\\stack\\npm\\node_modules',
        'f:\\study\\update-app\\src\\stack\\node_modules',
        'f:\\study\\update-app\\src\\node_modules',
        'f:\\study\\update-app\\node_modules',
        'f:\\study\\node_modules',
        'f:\\node_modules'
 * 全局:npm root -g
 * C:\Users\Administrator\AppData\Roaming\npm\node_modules
 *  */

let f = require('fs');


