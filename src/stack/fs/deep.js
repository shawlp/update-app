let fs = require('fs');
let path = require('path');
function wide(dir, callback) {
    let arr = [dir];
    let index = 0;
    function rmdir() {
        function next() {
            let current = arr[--index];
            if (!current) return callback;
            fs.stat(current, function(err, stat) {
                if (stat.isDirectory()) {
                    fs.rmdir(current, next);
                } else {
                    fs.unlink(current, next);
                }
            })
        }
        next();
    }
    function next() {
        console.log('arr', arr);
        if (index === arr.length) return rmdir()
        let current = arr[index++];
        fs.stat(current, function(err, stat) {
            if (stat.isDirectory()) {
                fs.readdir(current, function(err, files){
                    arr = [...arr, ...files.map(file => {
                        return path.join(current, file);
                    })];
                    next();
                })
            } else {
                next();
            }
        })
    }
    next();
}

wide('a', function() {
    console.log('删除成功！');
})