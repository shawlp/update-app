let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname, '1.txt'), { highWaterMark: 3 });

rs.on('readable', function() {
    // 把缓存区读空
    let data = rs.read();
    console.log(data && data.toString());
})

// 123
// 456
// 789
// 0
// null