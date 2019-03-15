let fs = require('fs');
let path = require('path');

// fs.watchFile('./1.txt', function(current, prev){
//     if (Date.parse(current.ctime) == 0) {
//         console.log('删除');
//     } else if (Date.parse(prev.ctime) === 0) {
//         console.log('创建');
//     } else {
//         console.log('修改');
//     }
// });

// fs.truncate('1.txt', 5, function(err){
//     console.log(err);
// });

// 创建文件夹
// 目录创建必须保证父级存在才能创建
// fs.mkdir('a/b/c', function(err){
//     console.log(err);
// });

// function preWide(dir) {
//     let arrs = [dir];
//     let index = 0;
//     let current;
//     while (current = arrs[index++]) {
//         let stat = fs.statSync(current);
//         if (stat.isDirectory()) {
//             let files = fs.readdirSync(current);
//             arrs = [...arrs, ...files.map(file => {
//                 return path.join(current, file)
//             })];
//         } 
//     }
//     for (let i = arrs.length - 1; i >= 0; i--) {
//         let stat = fs.statSync(arrs[i]);
//         if (stat.isDirectory()) {
//             fs.rmdirSync(arrs[i]);
//         } else {
//             fs.unlinkSync(arrs[i]);
//         }
//     }
// }

// preWide('a');

// 删除目录： fs.rmdirSync('a'), fs.rmdir('a', () => {})
// 删除文件: fs.unlinkSync('a.js'), fs.unlink('a.js', () => {})

// 递归删除文件
// function rmdir(dir, callback) {
//     fs.readdir(dir, function(err, files) {
//         console.log(files);
//         function next(index) {
//             if (index === files.length) return fs.rmdir(dir, callback);
//             let newPath = path.join(dir, files[index]);
//             fs.stat(newPath, function(err, stat){
//                 if (stat.isDirectory()) {
//                     rmdir(newPath, ()=>next(index+1));
//                 } else {
//                     fs.unlink(newPath, ()=>next(index+1));
//                 }
//             })
//         }
//         next(0)
//     })
// }

// rmdir('a', function() {
//     console.log('删除成功！');
// })

// 异步删除 promise
// function removePromise(dir){
//     return new Promise(function(resolve,reject){
//         fs.stat(dir,function(err,stat){
//             if (err) console.error(err);
//             if(stat.isDirectory()){
//                 fs.readdir(dir,function(err,files){ 
//                     files = files.map(file=>path.join(dir,file)); // [a/b,a/e,a/1.js]
//                     files = files.map(file=>removePromise(file))
//                     Promise.all([files]).then(function(){
//                         fs.rmdir(dir,resolve);
//                     });
//                 })
//             }else{ // 如果是文件 删除文件 直接变成成功态即可
//                 fs.unlink(dir,resolve)
//             }
//         })
       
//     })
// }
// removePromise('a').then(function(){
//     console.log('删除')
// });

// 同步删除
// function removeDir(dir) {
//     let files = fs.readdirSync(dir);

//     console.log('files', files); 

//     for(let i = 0; i < files.length; i++) {
//         let newPath = path.join(dir, files[i]);
//         let stat = fs.statSync(newPath);
//         if (stat.isDirectory()) {
//             removeDir(newPath);
//         } else {
//             fs.unlinkSync(newPath);
//         }
//     }
//     fs.rmdirSync(dir);
// }

// removeDir('a');  

// fs.statSync
// fs.stat('a', function(err, stat) {
//     console.log(stat.isFile());
//     if (stat.isDirectory()) {
//         fs.readdir('a', function(err, files) {
//             console.log('files', files);
//         })
//     }
// })

// 异步创建文件
function mkdirSync(dir, callback) {
    let paths = dir.split('/');
    function next(index) {
        if (index > paths.length) return callback();
        let newPath = paths.slice(0, index).join('/');
        console.log(newPath);
        fs.access(newPath, function(err) {
            if (err) {
                fs.mkdir(newPath, function(err) {
                    next(index+1);
                })
            } else {
                next(index+1);
            }
        })
    }
    next(1);
}

mkdirSync('a/e/w/q/m/n', function() {
    console.log('创建完成！');
})

// 同步创建文件
// function makep(dir) {
//     let paths = dir.split('/');
//     for(let i = 1; i <= paths.length; i++) {
//         let newPath = paths.slice(0, i).join('/');
//         try {
//             // 对path指定访问性检查，若报错说明文件不存在
//             fs.accessSync(newPath, fs.constants.R_OK);
//         } catch(e) {
//             fs.mkdirSync(newPath);
//         }
//     }
// }

// makep('a/b/c/d/e');

