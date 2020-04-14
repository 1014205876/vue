/**Module dependencies.*/
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const formidable = require('formidable');
const proxy = require('http-proxy-middleware');
const jwt = require('jsonwebtoken'); // 使用jwt签名
const multer = require('multer');
const path = require('path');
const MemoryStore = require('session-memory-store')(session);
const url = require('url');

var userArr = require('./json/user.json');
var fileUtils = require('./upload/fileUtils');
var config = require('./config/config');
var otherProject = require('./config/other-project');

var app = express();
router = express.Router(),
    app.listen(config.port);

app.use(compression());
app.use(cookieParser());
app.use(session({
    name: 'NSESSIONID',
    secret: 'Hello I am a long long long secret',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore()
}));

app.get('/authApi/cookie', function (req, res) {
    //禁止该接口返回304缓存
    res.header('expires', '0');
    res.header('cache-control', 'no-store');
    res.header('pragma', 'no-cache');
    //调取接口判断当前用户是否登录
    let token = req.cookies.token
    if (token) {
        res.json({
            "code": "200",
            "data": {
                userName: jwt.decode(token).name,
                hyperlink: config.hyperlink,//超链接
            }
        });
    } else {
        res.json({
            "code": "403",
            "reason": "未记住登录状态",
            "data": {
                hyperlink: config.hyperlink,//超链接
            }
        });
    }
})
app.get('/authApi/loginOut', function (appReq, res) {
    //用户退出登录删除token
    res.clearCookie('token')
    res.json({
        "code": "200",
        "reason": "退出登录成功",
        "data": {}
    });
})
app.post('/authApi/login', bodyParser.json({ limit: '10mb' }), function (appReq, res) {
    var userInfos = {
        mobile: appReq.body.mobile,
        key: appReq.body.key,
        captcha: appReq.body.captcha,
        smsCaptcha: appReq.body.smsCaptcha
    }
    var content = JSON.stringify(userInfos)
    var options = {
        hostname: config.proxy.hostname, //服务器id
        port: config.proxy.port, //服务器端口号
        path: '/user-center/v1/login/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            auth_id: config.proxy.AUTH_ID
        }
    }
    var req = http.request(options, function (e) {
        e.setEncoding('utf8')
        e.on('data', function (user) {
            //根据后端返回值，判断用户名和密码
            user = JSON.parse(user)
            if (user.code == '200' || user.code == '201') {
                // 将用户名通过jwt加密token
                var token = jwt.sign(
                    { name: appReq.body.mobile, type: 'personal' },
                    'puhui',
                    {
                        expiresIn: 60 * 60 * 24 * 30 // 授权时效24小时
                    }
                )
                // res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000 * 30, domain: '192.168.111.201:4400'})
                res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000 * 30 }) // 授权时效24小时
                res.json({
                    code: '200',
                    reason: '',
                    data: user.data
                })
            } else {
                res.json(user)
            }
        })
    })

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message)
    })

    req.write(content)
    req.end()
})

// 请求代理
var proxyConfig = proxy({
    target: config.proxy.target,
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/api': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('AUTH_ID', config.proxy.AUTH_ID);
        if (config.cas.switch) {
            proxyReq.setHeader('AUTH_USER', encodeURI(req.session.cas.user));
        } else {
            proxyReq.setHeader('AUTH_USER', config.proxy.AUTH_USER);
        }
    }
});

// 请求代理
var proxyConfigJuhe = proxy({
    target: 'http://api.juheapi.com',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/juhe': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        res.header('Content-Type', 'text/html;charset=UTF-8');
        // res.header('Content-Type', 'text/html; charset=utf-8');
        // res.header('Content-Type2', 'text/html; charset=utf-82');
        // res.writeHead(200, { 'Content-Type1': 'text/html; charset=utf-81' });//只需要设置响应头的编码格式就好
        // proxyReq.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
});
// 请求代理
var proxyConfigApishop = proxy({
    target: 'http://api.apishop.net',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/apishop': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // res.header('Content-Type', 'text/html;charset=UTF-8');
        // res.header('Content-Type', 'text/html; charset=utf-8');
        // res.header('Content-Type2', 'text/html; charset=utf-82');
        // res.writeHead(200, { 'Content-Type1': 'text/html; charset=utf-81' });//只需要设置响应头的编码格式就好
        // proxyReq.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
});

app.use('/api', proxyConfig);
app.use('/juhe', proxyConfigJuhe);
app.use('/apishop', proxyConfigApishop);
app.use('/node',
    router.get('/cookie', (req, res) => {//查询浏览器记住的登录信息
        //禁止该接口返回304缓存
        res.header('expires', '0');
        res.header('cache-control', 'no-store');
        res.header('pragma', 'no-cache');
        //调取接口判断当前用户是否登录
        let token = req.cookies.token
        if (token) {
            res.json({
                "code": "200",
                "reason": "已经登录",
                "data": {
                    userName: jwt.decode(token).name
                }
            });
        } else {
            res.json({
                "code": "403",
                "reason": "登陆过期",
                "data": {}
            });
        }
    }),
    router.get('/other/project', (req, res) => {//查询浏览器记住的登录信息
        res.json({
            "code": "200",
            "reason": "已经登录",
            "data": otherProject
        });
    }),
    router.post('/loginOut', (req, res) => {//忘记登录状态
        //用户退出登录删除token
        res.clearCookie('token')
        res.json({
            "code": "200",
            "reason": "退出成功",
            "data": {}
        });
    }),
    router.post('/login', (req, res) => {//登录
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                let has = true;
                userArr.forEach((item) => {
                    if (item.userName == data.userName) {
                        has = false;
                        if (item.password == data.password) {
                            var token = jwt.sign({ name: item.userName }, 'wangzheng', {
                                expiresIn: 60 * 60 * 24 * 30// 授权时效24小时
                            });
                            res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000 * 30 });// 授权时效24小时
                            res.send({
                                code: 200,
                                data: item,
                            });
                        } else {
                            res.send({
                                code: 404,
                                data: '',
                                reason: '密码错误'
                            })
                        }
                    }
                });
                if (has) {
                    res.send({
                        code: 404,
                        data: '',
                        reason: '查无此人'
                    })
                }
            }
        })
    }),
    router.post('/register', (req, res) => {//注册接口
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                if (data.password == '111') {
                    userArr.push(data);
                    res.send({
                        code: 200,
                        data: userArr[userArr.length - 1],
                    })
                } else {
                    res.send({
                        code: 400,
                        data: '',
                        reason: '密码错误'
                    })
                }
            }
        })
    }),
    router.get('/user', (req, res) => {//查询当前登录的用户
        var data = url.parse(req.url, true).query;
        userArr.forEach((item) => {
            if (data.userName == item.userName) {
                res.send({
                    code: 200,
                    data: item,
                })
            }
        })
    }),
    router.post('/user', (req, res) => {//修改用户信息
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            userArr[0] = data;
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                res.send({
                    code: 200,
                    data: userArr,
                })
            }
        })
    }),
    router.get('/users', (req, res) => {//查询所有已经注册的用户
        var data = url.parse(req.url, true).query;
        if (data.password == '111') {
            res.send({
                code: 200,
                data: userArr,
            })
        } else {
            res.send({
                code: 404,
                data: '',
                reason: '密码错误'
            })
        }
    })
);

/**单文件上传*/
let uploadSingle = multer({ dest: 'files/' });
app.post('/upload', uploadSingle.single('file'), function (req, res) {
    // 文件信息
    if (!req.file) {
        res.send(req.error);
        return;
    }
    var file = req.file;
    // 腾讯云
    // fileUtils.putObject(file.path, file.originalname, file.size, file.mimetype, function (err, result) {
    //     if (err) {
    //         res.send(500, 'upload fail!');
    //     } else {
    //         res.send({
    //             location: "https://" + result.Location,
    //             name: file.originalname
    //         });
    //     }
    // });
    // 阿里云
    fileUtils(file.originalname, file.path, function (code, result) {
        if (code == 200) {
            res.send({
                code: 200,
                location: result.url.replace(/http/, "https"),
                name: result.name,
                data: result
            });
        } else {
            res.send({
                code: 500,
                reason: result
            });
        }
    });
});

//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, 'dist')));

//把路由交给angular管理
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log(`[DEMO] Server: listening on ${config.port} `);