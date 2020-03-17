var express = require('express')
var proxy = require('http-proxy-middleware');
var multer = require('multer');
const config = require('./config/config')
const path = require('path');

var fileUtils = require('./upload/fileUtils');
const app = express();
app.listen(config.port);

var proxyConfig = proxy({
    target: config.proxy.target,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/api': ''
    },
    onProxyReq: function onProxyReq (proxyReq, req, res) {
        console.log(1)
    }
});
app.use('/api', proxyConfig);
/**
 * 单文件上传
 */
let uploadSingle = multer({
    dest: 'upload/'
});
app.post('/upload', uploadSingle.single('file'), function (req, res) {
    // 文件信息
    if (!req.file) {
        res.send(req.error);
        return;
    }
    var file = req.file;
    fileUtils.putObject(file.path, file.originalname, file.size,  function (err, result) {
        if (err) {
            res.send(500, 'upload fail!');
        } else {
            res.send({
                location: "https://" + result.Location,
                name: file.originalname
            });
        }
    });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})
console.log(`server start ${config.port}`)