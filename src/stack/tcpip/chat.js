let net = require('net');
let clients = {};
let server = net.createServer(function(socket) {
    let key = socket.remoteAddress + socket.remotePort;
    socket.write(`欢迎光临本聊天室，你的地址是${key}\r\n`);
    clients[key] = {
        nickname: '匿名',
        socket
    };
    socket.setEncoding('utf8');
    socket.on('data', function(data) {
        data = data.replace('\r\n', '');
        let type = data.slice(0, 1);
        switch(type) {
            case 'b': // 广播
                let text = data.slice(2);
                broadcast(text);
                break;
            case 'c': // c:对方的用户名:内容
                let values = data.split(':');
                let toUser = values[1];
                let toText = values[2];
                sendTo(toUser, toText);
                break;
            case 'l': // 列出在线的所有用户
                list();
                break;
            case 'n': // 更改自己的名字
                let newName = data.slice(2);
                let oldUserObj = clients[key];
                oldUserObj.nickname = newName;
                socket.write(`你的用户名已经修改为${newName}\r\n`);
                break;
            default:
                socket.write(`此命令不能识别,请重新输入!\r\n`);
                break;
        }
    });
    socket.on('end', function() {
        socket.destroy();
        delete clients[key];
    })
    function list() {
        let result =`在线用户列表:\r\n`;
        for (let user in clients) {
            result += clients[user].nickname + '\r\n';
        }
        socket.write(result);
    } 
    function sendTo(toUser, text) {
        let toUserobj;
        for (let user in clients) {
            if (clients[user].nickname === toUser) {
                toUserobj = clients[user];
                break;
            }
        }
        if (toUserobj) {
            let {nickname} = clients[key];
            toUserobj.socket.write(`${nickname}: ${text}`)
        } else {
            socket.write(`用户名不正确或对方已经下线!`);
        }
    }
    function broadcast(text) {
        let {nickname} = clients[key];
        for(let user in clients) {
            if (clients.hasOwnProperty(user) && user !== key) {
                clients[user].socket.write(`${nickname}:${text}`);
            }
        }
    }
});

server.listen(8080);