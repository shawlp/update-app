let dgram = require('dgram');
let socket = dgram.createSocket('udp4');

let buf = Buffer.from('珠峰之巅');
socket.send(buf, 3, 6, 41234, 'localhost', function(){
    console.log(arguments);
});

socket.on('message', function(msg, rinfo){
    console.log('client', msg.toString());
})