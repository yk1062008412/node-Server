/*
 * @Author: yk1062008412
 * @Date: 2019-10-31 22:06:16
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-27 22:49:22
 * @Description: login登录相关信息
 */
const express = require('express');
const router = express.Router();
const loginModel = require('../../models/admin/login');

// 登录系统
router.post('/loginSystem', function(req, res){
    loginModel.loginSystem(req, res)
})

// 获取我的个人信息
router.post('/getMyInfo', function(req, res){
    loginModel.getMyInfo(req, res)
})

module.exports = router;