/*
 * @Author: yk1062008412
 * @Date: 2019-10-28 22:31:07
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-15 22:37:57
 * @Description: file content
 */
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const testRouter = require('./routers/test');
const loginRouter = require('./routers/admin/login');
const categoryRouter = require('./routers/admin/category');
const expressJwt = require('express-jwt');
const vertoken = require('./common/token_verify');

// 跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

// 验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: 'mes_qdhd_mobile_xhykjyxgs'
}).unless({
	path: ['/login/loginSystem']//除了这个地址，其他的URL都需要验证
}));

// token获取
app.use(function(req, res, next){
    const token = req.headers.authorization;
	if(token == undefined){
		return next();
	}else{
		vertoken.verifyToken(token).then((data)=> {
			req.data = data;
			return next();
		}).catch((error)=>{
			return next();
        })
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/test', testRouter);
app.use('/login', loginRouter);
app.use('/category', categoryRouter);

//当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send({ code: 999, msg: 'token失效'});
	}
});

module.exports = app;