/*
 * @Author: yk1062008412
 * @Date: 2019-11-20 22:59:42
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-27 22:47:26
 * @Description: 系统账号
 */
const express = require('express');
const router = express.Router();
const admAccountModel = require('../../models/admin/adm_account');

// 获取系统管理员列表
router.post('/getAdmAccountList', function(req, res){
    admAccountModel.getAdmAccountList(req, res);
})

// 获取系统管理员详情
router.post('/getAdmAccountDetail', function(req, res){
    admAccountModel.getAdmAccountDetail(req, res);
})

// 新增系统管理员
router.post('/admAccountAdd', function(req, res){
    admAccountModel.admAccountAdd(req, res);
})

// 更新系统管理员信息
router.post('/admAccountUpdate', function(req, res){
    admAccountModel.admAccountUpdate(req, res);
})

// 删除系统管理员
router.post('/admAccountDelete', function(req, res){
    admAccountModel.admAccountDelete(req, res);
})

// 修改系统管理员密码
router.post('/admAccountPwdChange', function(req, res){
    admAccountModel.admAccountPwdChange(req, res);
})

// 设置,取消超级管理员(超级管理员多了添加管理员功能)
router.post('/admAccountSuper', function(req, res){
    admAccountModel.admAccountSuper(req, res);
})

module.exports = router;