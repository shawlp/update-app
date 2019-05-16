const express = require('./express'); 
const app = express();
// /user?name=zfpx&age=8
// 内靠的是一个内置中间件
app.get('/user', function(req, res) {
    let { name, age } = req.query;
    console.log('name', name, 'age', age); // { name: 'shaw', age: '25' }
    console.log(req.query); 
    console.log(req.path); // /user
    console.log(req.hostname); // localhost
    res.end('ok');
}); 
app.listen(8080);  