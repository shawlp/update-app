let argv = {};
// hello C:\Program Files\nodejs\node.exe,f:\study\update-app\src\stack\yargs\1.hello.js,--name,shaw
let args = process.argv;

for (let i = 2; i < args.length; i++) {
    let val = args[i];
    if (val.startsWith('--')) {
        argv[val.slice(2)] = args[++i];
    }
}

exports.argv = argv;
// module.exports = argv;
