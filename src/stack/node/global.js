/**
 * global全局对象
 * window里也有全局对象，但不能访问，浏览器访问global是通过window实现的
 * 1.global的变量是全局变量
 * 2.所有的全局变量都是global的属性
 * console
 * process 当前进程
 * chdir 更换文件目录
 * cwd 当前工作目录
 * nextTick 
 * stdout stderr stdin
 * Buffer
 * clearImmediate clearInterval clearTimeout
 * setImmediate setInterval setTimeout
 * setImmediate:把回调函数加入I/O事件队列的尾部 setInterval setTimeout:宏任务，事件循环队列中
 */
// cwd: current working directory
console.log(process.cwd());
console.log(process.chdir('..')); // 切换到上级目录
console.log(process.cwd());

/**
 *V8引擎最大使用内存量是1.7个G
 * rss: 20512768, 常驻内存
  heapTotal: 8388608, 堆内存的总申请量
  heapUsed: 4338520,//已经使用的量
  external: 8224 }  //外部内存的使用量
 */ 
console.log(process.memoryUsage());

