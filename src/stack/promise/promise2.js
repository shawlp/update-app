const PENDING = 'pending'; // 初始态
const FULFILLED = 'fulfilled'; // 成功态
const REJECTED = 'rejected'; // 失败态

function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (value != null && value.then && typeof value.then == 'function') {
            return value.then(resolve, reject);
        }
        setTimeout(function(){
            if (self.status == PENDING) {
                self.status = FULFILLED;
                self.value = value;
                self.onResolvedCallbacks.forEach(cb => cb(self.value));
            }
        })
    }

    function reject(reason) {
        setTimeout(function() {
            if (self.status == PENDING) {
                self.status = REJECTED;
                self.value = reason;
                self.onRejectedCallbacks.forEach(cb => cb(self.value));
            }
        })
    }

    try {
        executor(resolve, reject);
    } catch(err) {
        reject(err);
    };
}
function resolvePromise(promise2, x, resolve, reject){
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
    let called = false;
    if (x instanceof Promise) {
        if (x.status == PENDING) {
            x.then(function(y){
                resolvePromise(promise2, y, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
    } else if (x != null && ((typeof x == 'object') || (typeof x == 'function'))) {
        try {
            let then = x.then;
            if (typeof then == 'function') {
                then.call(x,function(y){
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function(err){
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch(e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function(value) {return value};
    onRejected = typeof onRejected == 'function' ? onRejected : function(reason) {return reason};
    
    let self = this;
    let promise2;
    if (self.status == FULFILLED) {
        return promise2 = new Promise(function(resolve, reject){
            setTimeout(function(){
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);    
                }    
            })
        });
    }
    if (self.status == REJECTED) {
        return promise2 = new Promise(function(resolve, reject){
            setTimeout(function(){
                try {
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);    
                }    
            })
        }); 
    }
    if (self.status == PENDING) {
        return promise2 = new Promise(function(resolve, reject){
            self.onResolvedCallbacks.push(function(){
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push(function(){
                try {
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            })
        });
    }
}

Promise.prototype.catch = function(onRejected) {
    this.then(null, onRejected);
}

Promise.deferred = Promise.defer = function(){
    let defer = {};
    defer.promise = new Promise(function(resolve, reject){
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

function gen(times, cb) {
    let result = [],count = 0;
    return function(i, data) {
        result[i] = data;
        if (++count == times) {
            cb(result);
        }
    }
}

Promise.all = function(promises) {
    return new Promise(function(resolve, reject){
        let done = gen(promises.length, resolve);
        for (let i = 0; i <promises.length; i++) {
            promises[i].then(function(data) {
                done(i, data);
            }, reject);
        }
    });
}

Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
        }
    })
}

Promise.resolve = function(value) {
    return new Promise(function(resolve){
        resolve(value);
    })
}

Promise.reject = function(reason) {
    return new Promise(function(resolve, reject){
        reject(reason);
    })
}

module.exports = Promise; 





