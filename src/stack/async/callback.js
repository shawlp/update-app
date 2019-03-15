/*
** 解决回调嵌套的问题
*/

// 1.通过事件发布-订阅来实现
// node核心模块中的一个类，通过它可以创建事件发射器的实例，里面有两个核心方法，一个叫on emit，on表示注册监听，emit表示触发监听
// let fs = require('fs');
// let EventEmitter = require('events');
// let eve = new EventEmitter();
// let html = {};

// eve.on('ready', function(key, value){
//     html[key] = value;
//     if (Object.keys(html).length === 2) {
//         console.log(html);
//     }
// });

// fs.readFile('./template.txt', 'utf8', function(err, template){
//     eve.emit('ready', 'template', template);
// });

// fs.readFile('./data.txt', 'utf8', function(err, data) {
//     eve.emit('ready', 'data', data);
// });


// 2.通过一个哨兵函数来实现
let fs = require('fs');
function render(length, cb) {
    let html = {};
    return function(key, value) {
        html[key] = value;
        if (Object.keys(html).length === length) {
            cb(html);
        }
    }
}

let done = render(2, function(html) {
    console.log(html);
});

fs.readFile('./data.txt', 'utf8', (err, data) => {
    done('data', data);
});

fs.readFile('./template.txt', 'utf8', (err, data) => {
    done('template', data);
});



