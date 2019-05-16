// 要创建一个服务器
let config = require('./config');
let http = require('http');
let chalk = require('chalk');
let path = require('path');
let url = require('url');
let fs = require('fs');
let zlib = require('zlib');
let handlebars = require('handlebars');
let { promisify, inspect } = require('util');
let mime = require('mime');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
// 编译模板，得到一个渲染的方法，然后传入实际的数据就可以得到渲染后的HTML了
function list() {
    let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8');
    return handlebars.compile(tmpl);
}

//这是一个在控制台输出的模块,名称有特点有二部分组成，第一部分一般是项目名，第二模分是模块名
//每个debug实例都有一个名字，是否在控制台打印取决于环境变量中DEBUG的值是否等于static:app
let debug = require('debug')('static:app');
/**
 * 1. 显示目录下面的文件列表和返回内容
 * 2. 实现压缩的功能
 * 3. 实现缓存
 * 4. 获取部分数据
 * 
 * set DEBUG=static:*
 */
class Server { 
    constructor(argv) {
        this.list = list();
        this.config = Object.assign({}, config, argv);
    }
    start() {
        let server = http.createServer();
        server.on('request', this.request.bind(this));
        server.listen(this.config.port, () => {
            let url = `http://${this.config.host}:${this.config.port}`;
            debug(`server started at ${chalk.green(url)}`);
        });
    }
    async request(req, res) {
        // 先取到客户端想要的文件或文件夹路径
        let { pathname } = url.parse(req.url);
        if (pathname === '/favicon.ico') {
            return this.sendError('not found', req, res);
        }
        let filepath = path.join(this.config.root, pathname);
        console.log('request filepath', filepath);
        try {
            let statObj = await stat(filepath);
            if (statObj.isDirectory()) {
                let files = await readdir(filepath); 
                files = files.map(file => ({
                    name: file,
                    url: path.join(pathname, file)
                }));
                let html = this.list({
                    title: pathname,
                    files
                });
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            } else {
                this.sendFile(req, res, filepath, statObj);
            }
        } catch(e) {
            debug(inspect(e)); // inspect把一个对象转成字符
            this.sendError(e, req, res); 
        }
    }
    sendFile(req, res, filepath, statObj) {
        if (this.handleCache(req, res, filepath, statObj)) return; // 如果走缓存，则直接返回
        res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf-8');
        let encoding = this.getEncoding(req, res);
        let rs = this.getStream(req, res, filepath, statObj);

        if (encoding) {
            rs.pipe(encoding).pipe(res);
        } else {
            rs.pipe(res);
        }
    }
    getStream(req, res, filepath, statObj) {
        let start = 0;
        let end = statObj.size - 1;
        let range = req.headers['range'];
        if (range) {
            res.setHeader('Accept-Range', 'bytes');
            res.statusCode = 206;
            let result = range.match(/bytes=(\d*)-(\d*)/);
            if (result) {
                start = isNaN(result[1]) ? start : parseInt(result[1]);
                end = isNaN(result[2]) ? end : parseInt(result[2]) - 1;
            }
        }
        return fs.createReadStream(filepath, {
            start,
            end
        });
    }
    sendError(err, req, res) {
        res.statusCode = 404;
        res.end(`${err.toString()}`);
    }
    handleCache(req, res, filepath, statObj) {
        let ifModifiedSince = req.headers['if-modified-since'];
        let isNoneMatch = req.headers['is-none-match'];
        res.setHeader('Cache-control', 'private,max-age=30');
        res.setHeader('Expires', new Date(Date.now() + 30*1000).toGMTString());
        let etag = statObj.size;
        let lastModified = statObj.ctime.toGMTString();
        res.setHeader('ETag', etag);
        res.setHeader('Last-Modified', lastModified);
        if (isNoneMatch && isNoneMatch !== etag) {
            return false;
        }
        if (ifModifiedSince && ifModifiedSince !== lastModified) {
            return false;
        }
        if (isNoneMatch || ifModifiedSince) {
            res.writeHead(304);
            res.end();
            return true;
        } else {
            return false;
        } 
    }
    getEncoding(req, res) {
        let acceptEncoding = req.headers['accept-encoding'];
        if (/\bgzip\b/.test(acceptEncoding)) {
            res.setHeader('Content-Encoding', 'gzip');
            return zlib.createGzip();            
        } else if (/\bdeflate\b/.test(acceptEncoding)) {
            res.setHeader('Content-Encoding', 'deflate');
            return zlib.createDeflate();
        } else {
            return null;
        }
    }
}
module.exports = Server;

