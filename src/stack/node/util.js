let util = require('util');
let obj = {
    name: 'zfpx',
    home: {
        city: {
            name: 'beijing'
        }
    }
};
console.log(obj);
console.log(util.inspect(obj, { depth: 1 })); // { name: 'zfpx', home: { city: [Object] } }
console.log(util.inspect(obj, { depth: 2 })); // { name: 'zfpx', home: { city: { name: 'beijing' } } } 