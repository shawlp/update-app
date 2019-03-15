/** 
 * node是基于事件驱动的  
 */
let EventEmitter = require('./events');
let util = require('util');

function Bell() {
    EventEmitter.call(this); // 继承私有属性
}

// 进行原型继承，继承公用方法
util.inherits(Bell, EventEmitter);

let bell = new Bell();   

function studentInClassRoom(roomNumber, things) {
    console.log(`学生带着${things}进${roomNumber}教室`);
}

function teacherInClassRoom(roomNumber, things) {
    console.log(`教师带着${things}进${roomNumber}教室`);
}

function masterInClassRoom(roomNumber, things) {
    console.log(`李老师带着${things}进${roomNumber}教室`);
}

bell.on('响', studentInClassRoom);
bell.addListener('响', teacherInClassRoom);
bell.once('响', masterInClassRoom);   

bell.emit('响', '301', '书');
console.log('===============');
bell.emit('响', '301', '书'); 

