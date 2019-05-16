let reg = /user\/([^\/]+)\/([^\/]+)/;
let url = '/user/zfpx/9';
let result = url.match(reg);
console.log(result);

// [ 'user/zfpx/9',
//   'zfpx',
//   '9',
//   index: 1,
//   input: '/user/zfpx/9',
//   groups: undefined ]