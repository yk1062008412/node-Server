/*
 * @Author: yk1062008412
 * @Date: 2019-10-28 22:31:07
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-04 22:53:19
 * @Description: file content
 */
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
// 后台管理系统
const fileRouter = require('./routers/common/file_upload');
const testRouter = require('./routers/test');
const loginRouter = require('./routers/admin/login');
const categoryRouter = require('./routers/admin/category');
const goodsRouter = require('./routers/admin/goods');
const bannerRouter = require('./routers/admin/banner');
const bannerGoodsRouter = require('./routers/admin/banner_goods');
const admAccountRouter = require('./routers/admin/adm_account');
const userRouter = require('./routers/admin/user');
const orderRouter = require('./routers/admin/order');
// 小程序支付
const payRouter = require('./routers/common/weapp_pay');
// 用户侧系统
const homeRouter = require('./routers/user/home');
const mineRouter = require('./routers/user/mine');
const addressRouter = require('./routers/user/address');
const uOrderRouter = require('./routers/user/order');
// 微信H5支付
// const h5Router = require('./routers/common/h5app_pay');

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
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
});

// 静态资源
app.use('/uploadFile',express.static('./uploadFile'));

// 验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: 'mes_qdhd_mobile_xhykjyxgs'
}).unless({
    path: ['/api/login/loginSystem', /^\/user\/.*/ ] //除了这个地址，其他的URL都需要验证
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

app.use('/api/file', fileRouter);
app.use('/api/test', testRouter);
app.use('/api/login', loginRouter);
app.use('/api/category', categoryRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/bannerGoods', bannerGoodsRouter);
app.use('/api/admAccount', admAccountRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
// 支付
app.use('/user/pay', payRouter);
// 用户侧
app.use('/user/home', homeRouter);
app.use('/user/mine', mineRouter);
app.use('/user/address', addressRouter);
app.use('/user/order', uOrderRouter);
// H5支付
// app.use('/user/h5pay', h5Router);

//当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send({ code: 999, msg: 'token失效'});
	}
});

module.exports = app;