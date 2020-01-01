/*
 * @Author: yk1062008412
 * @Date: 2020-01-01 12:54:25
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-01 12:57:24
 * @Description: home 首页
 */
const express = require('express');
const router = express.Router();
const homeModel = require('../../models/user/home');

router.post('/getBannerList', function(req, res){
  homeModel.getBannerList(req, res);
})

router.post('/getCategoryList', function(req, res){
  homeModel.getCategoryList(req, res);
})

module.exports = router;