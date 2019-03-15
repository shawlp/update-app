function next() {
    console.log(1);
    setTimeout(function() {
        console.log(2);
    });
    // process.nextTick方法是将回调函数放在执行栈的尾部
    process.nextTick(function() {
        console.log(3);
        process.nextTick(function() {
            console.log(4);
            process.nextTick(function() {
                console.log(5);
            })
        })
    });
    let p = new Promise(function(resolve, reject) {
        console.log(6);
        return new Promise(function(resolve1, reject1) {
            console.log(7);
            resolve(8);
        })
    });
    p.then(function(data) {
        console.log(data);
    })
}

next(); // 1 6 7 3 4 5 8 2

// 微任务（js引擎）：promise，宏任务（宿主环境分配的，如浏览器）:setTimeout,setInterval等，微任务比宏任务先执行
// 事件循环:JavaScript引擎等待宿主环境分配宏观任务，在操作系统中，通常等待的行为都是一个事件循环。因此，宏观任务的队列相当于事件循环
// Promise永远在队列尾部添加微观任务，setTimeout等宿主API，则会添加宏观任务，微任务始终比宏任务先执行


