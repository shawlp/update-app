// 实现动画的方式: 1-JS的setTimeout 2-css3的transition和animation 3-html的canvas 4-requestAnimationFrame
// 由系统来决定回调函数的执行时机。系统每次绘制之前会主动调用requestAnimationFrame中的回调函数，与setTimeout相比，它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次，这样不会引起丢帧，也不会导致动画出现卡顿。
// 一般电脑屏幕的刷新频率是60HZ,即回调函数每16.7ms执行一次  

// 简单的兼容
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function step() {
    console.log(new Date());
    requestAnimationFrame(step);
}

requestAnimationFrame(step);


