/** 
 * 在node.js中，任何一个文件都是一个模块
 * 1.找到这个文件
 * 2.读取文件内容
 * 3.把文件内容封装在一个函数内部
 * 4.创建此文件的module实例
 * 5.准备好五个参数(exports, require,module,__dirname,__filename)
 * 6.开始执行这个函数，并且把执行后的module.exports返回给调用方
 */

 module.exports = function() {
     console.log(1);
 }