let yargs = require('yargs'); 
// 它可以帮我们解析命令行参数，把参数数组变成对象的形式
let argv = yargs.options('n', {
    alias: 'name', // 别名
    demand: true, // 必填值
    default: 'shaw',
    description: '请输入你的姓名'
})
    .usage('help [options]')
    .help()
    .example('hello -name shaw', '执行hello命令，然后传入name参数为shaw')
    .alias('h', 'help')
    .argv;
console.log(argv);

console.log('hello ' + argv.name);
