// 把标准输出流输出到文件
console.log(1);
console.info(1);

console.warn(2);
console.error(2);

// 用来统计二段代码之间执行时间的
console.time('cost');
let i = 0;
while(i++<1000000){

}
console.timeEnd('cost');

// 断言
// 如果表达式为真，就什么也不发生
// 如果表达式为假，会报错
function sum(a, b){
    return a+b;
}
console.assert(sum(1,2) == 3, '报错'); 

let a = {name: 'zfpx', home:{name: '北京'}};
// 可以列出对象的结构
console.dir(global); 

// 跟踪当前代码的调用栈
console.trace(); 