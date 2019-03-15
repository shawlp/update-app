/*
* events只提供了一个对象：events.EventEmitter,EventEmitter的核心就是事件触发与事件监听器功能的封装
* 包括fs，net,http只要是支持事件响应的核心模块都是EventEmitter的子类
*/
let events = require('events');
let eventEmitter = new events.EventEmitter(); 

let listener1 = function(){
    console.log('信号1', eventEmitter.listenerCount('connection'), '个信号');
};

let listener2 = function() {
    console.log('信号2',  eventEmitter.listenerCount('connection'), '个信号');
};

eventEmitter.addListener('connection', listener1);

eventEmitter.on('connection', listener2);

// 返回指定事件的监听器数量
let eventListeners = eventEmitter.listenerCount('connection');
console.log('eventListeners', eventListeners);

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listener1);

eventEmitter.emit('connection');