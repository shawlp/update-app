// console.log('main');

// process.nextTick(function() {
//     console.log('process.nextTick1');
// });

// setTimeout(function() {
//     console.log('setTimeout');
//     process.nextTick(function() {
//         console.log('process.nextTick2');
//     });
// }, 0);

// new Promise(function(resolve,reject){
//     console.log('promise');
//     resolve();
// }).then(function() {
//     console.log('promise then');
// });

// console.log('main2');

// main promise main2 process.nextTick1 promise then setTimeout process.nextTick2

console.log('main');

setTimeout(function() {
    console.log('setTimeout');
    process.nextTick(function() {
        console.log('process.nextTick2');
    });
}, 0);

new Promise(function(resolve,reject){
    console.log('promise');
    resolve();
}).then(function() {
    console.log('promise then');
});

process.nextTick(function() {
    console.log('process.nextTick1');
});

console.log('main2');

// main promise main2 process.nextTick1 promise then setTimeout process.nextTick2

// 微任务（js引擎）：promise，宏任务（宿主环境分配的，如浏览器）:setTimeout,setInterval等，微任务比宏任务先执行
// 事件循环:JavaScript引擎等待宿主环境分配宏观任务，在操作系统中，通常等待的行为都是一个事件循环。因此，宏观任务的队列相当于事件循环
// Promise永远在队列尾部添加微观任务，setTimeout等宿主API，则会添加宏观任务，微任务始终比宏任务先执行

// 执行栈:main -> 微任务promise -> main2 -> process.nextTick1 -> 耗时操作结果promise then -> 宏任务setTimeout -> process.nextTick2

