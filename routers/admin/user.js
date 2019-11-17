/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 22:09:54
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 22:10:43
 * @Description: 用户信息
 */
const express = require('express');
const router = express.Router();
const userModel = require('../../models/admin/user');

router.post('/getUserList', function(req, res){
    userModel.getUserList(req, res)
})

router.post('/getUserDetail', function(req, res){
    userModel.getUserDetail(req, res)
})

module.exports = router;