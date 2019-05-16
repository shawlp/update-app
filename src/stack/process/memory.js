/**
 * process.memoryUsage()
 */
let s = process.memoryUsage();
console.log(s);
let buf = Buffer.alloc(1024 * 1024 * 1024);

/**
 * node v8引擎内存使用量是有上限的，32位里最多是.7G, 64位最多是1.7G
 * 
 * { rss: 24707072,
  heapTotal: 6537216,
  heapUsed: 3842896,
  external: 1073750504 } buffer的内存是单独分配的，属于external
 */
s = process.memoryUsage();
console.log(s);