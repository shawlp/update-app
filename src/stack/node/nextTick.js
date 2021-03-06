/** 
 * nextTick setImmediate 区别和联系
 * nextTick把回调函数放在当前执行栈的底部
 * setImmediate把回调函数放在事件队列的尾部
 */
function read() {
    setImmediate(function() {
        console.log(1);
        setImmediate(function() {
            console.log(2);
            process.nextTick(function() {
                console.log(0);
            });
            setImmediate(function() {
                console.log(3);
            })
        })
    })
}

read(); // 1 2 0 3