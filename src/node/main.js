/*
*node.js是单线程应用程序，v8引擎提供的异步执行回调接口
*node上基本上所有的事件机制都是用设计模式中观察者模式实现，node单线程类似进入一个while(true)的事件循环，直到没有事件观擦者退出，每个异步事件都生成一个事件观察者，若有事件发生就调用该回调函数
*在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数
*/
let events = require('events');
let eventEmitter = new events.EventEmitter();

eventEmitter.on('connection', function() {
    console.log('连接成功');
    eventEmitter.emit('data_received');
});

eventEmitter.on('data_received', function() {
    console.log('事件接收成功！');
});

eventEmitter.emit('connection');

