// 节流: 持续触发事件，每隔一段时间，只执行一次事件
// 实现方式: 1-时间戳 2-定时器

// 使用时间戳:事件会立即执行，停止触发后没有办法再执行事件
function throttle1(func, wait) {
    let context, args;
    let previous = 0;
    return function() {
        context = this;
        args = arguments;
        let now = +new Date();
        if(now - previous > wait) {
            func.apply(context, args);
            // 让下一个计时起点为当前时间
            previous = now;
        }
    }
}

// 使用定时器:事件在n秒后第一次执行，事件停止触发后依然会再执行一次事件
function throttle2(func, wait) {
    let timeout, context, args;
    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    }
}

// 既能立即执行，也能在事件停止触发后再执行一次事件
function throttle3(func, wait) {
    let timeout, context, args, result;
    let previous = 0;
    let later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
    }
    let throttled = function() {
        let now = +new Date();
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout){
            timeout = setTimeout(later, remaining);
        }
    }
    return throttled;
}

// 通用的，能自主控制要么立即执行停止不触发（有头无尾），要么不立即执行停止触发(无头有尾)
/**
 *
 *
 * @param {*} func
 * @param {*} wait
 * @param {*} options leading: false(代表不立即调用) trailing: false(代表事件停止后不触发),leading和trailing不可同时设置为false
 * @returns
 */
function throttle4(func, wait, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) options = {};
    let later = function() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;    
    } 

    let throttled = function() {
        let now = +new Date();
        context = this;
        args = arguments;
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now -previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = null;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    }

    throttled.cancel = function() {
        timeout && clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }

    return throttled;
} 