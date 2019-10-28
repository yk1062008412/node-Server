const express = require('express');
const app = express();
const session = require('express-session');

const testRouter = require('./routers/test');
const adminRouter = require('./routers/dev/admin')

// 使用 session 中间件
app.use(
    session({
        secret: 'secret', // 对session id 相关的cookie 进行签名
        resave: true,
        saveUninitialized: false, // 是否保存未初始化的会话
        cookie: {
            maxAge: 1000 * 60 * 30 // 设置 session 的有效时间，单位毫秒
        }
    })
);

app.use('/', testRouter);
app.use('/admin', adminRouter);

module.exports = app;