function EventEmitter() {
    this.events = {}; // 会把所有事件监听函数放在这个对象里保存
    // 指定一个事件类型增加的监听函数数量最多有几个
    this._maxListeners = 10;
}

EventEmitter.prototype.setMaxListeners = function(maxListeners) {
    this._maxListeners = maxListeners;
}

// 返回所有的监听器
EventEmitter.prototype.listeners = function(type) {
    return this.events[type];
}

// 注册监听事件
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type, listener) {
    if (this.events[type]) {
        this.events[type].push(listener);
        if (this._maxListeners !== 0&&this.events[type].length > this._maxListeners) {
            console.error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this.events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`);
        }
    } else {
        this.events[type] = [listener];
    }
}   

// 只执行一次
EventEmitter.prototype.once = function(type, listener) {
    debugger;
    let wrapper = (...rest) => { 
        listener.apply(this, rest); 
        this.removeListener(type, wrapper); 
    };
    this.on(type, wrapper);
}

// 移除事件监听器
EventEmitter.prototype.removeListener = function(type, listener) {
    if (this.events[type]) {
        this.events[type] = this.events[type].filter(l => l !== listener); 
    } 
}

// 移除某个事件的所有监听器
EventEmitter.prototype.removeAllListener = function(type) {
    delete this.events[type];
}

// 触发事件监听
EventEmitter.prototype.emit = function(type, ...rest) {
    this.events[type] && this.events[type].forEach((listener) => listener.apply(this, rest));
}

module.exports = EventEmitter;   



