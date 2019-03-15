function Promise(task) {
    let that = this;
    // 初始状态为peding
    that.status = 'pending';
    // 存放此promise的结果
    that.value = undefined;
    // 存放着所有成功的回调函数
    that.onResolvedCallbacks = [];
    // 存放着所有失败的回调函数
    that.onRejectedCallbacks = [];
    // 变成成功态
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject); 
        }

        if (that.status === 'pending') {
            that.status = 'fulfilled';
            that.value = value;
            that.onResolvedCallbacks.forEach(item => item(value));
        }
    }
    // 变为失败态
    function reject(reason) {
        if (that.status === 'pending') {
            that.status = 'rejected';
            that.value = reason;
            that.onRejectedCallbacks.forEach(item => item(reason));
        }
    }

    // 立即执行传入的任务
    try {
        task(resolve, reject);
    } catch(e) {
        reject(e);
    }

}

function resolvePromise(promise2, x, resolve, reject) {
    let then;
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function(y){
                resolvePromise(promise2, y, resolve, reject);
            },reject);
        } else if (x.status === 'fulfilled') {
            resolve(x.value);
        } else if (x.status === 'rejected') {
            reject(x.value);
        }
    } else if (x != null && (typeof x == 'object' || typeof x == 'function')) {
        try {
            then = x.then;
            if (typeof then == 'function') {
                then.call(x, function(y){
                    resolvePromise(promise2, y, resolve, reject);
                },reject);
            }
        } catch(e) {
            reject(e);
        }
    } else {
        resolve(x);
    }  
}

/**
 * onFulfilled成功的回调，onRejected失败的回调
 */
Promise.prototype.then = function(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) { return value };
    onReject = typeof onReject === 'function' ? onReject : function(reason) { throw reason };
    let that = this;
    let promise2;
    if (that.status === 'fulfilled') {
        promise2 = new Promise(function(resolve, reject){
            let x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
        });
    }
    if (that.status === 'rejected') {
        promise2 = new Promise(function(resolve, reject){
            let x = onReject(that.value);
            resolvePromise(promise2, x, resolve, reject);
        })
    }
    if (that.status === 'pending') {
        promise2 = new Promise(function(resolve, reject) {
            that.onResolvedCallbacks.push(function () {
                let x = onFulfilled(that.value);
                resolvePromise(promise2, x, resolve, reject);
            });
            that.onRejectedCallbacks.push(function() {
                let x = onReject(that.value);
                resolvePromise(promise2, x, resolve, reject);
            })
        })
    }
    return promise2;
}

module.exports = Promise;