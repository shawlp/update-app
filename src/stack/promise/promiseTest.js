let Promise = require('./promise.js');

let p1 = new Promise(function(resolve, reject){
    // reject(1000);
    setTimeout(() => {
        resolve({name: 'shaw', age: 25});
    }, 1000)
});

p1.then(function(data){
    console.log('success1', data);
}, function(err) {
    console.log('error1', err);
});

p1.then(function(data){
    console.log('success2', data);
}, function(err) {
    console.log('error2', err);
});