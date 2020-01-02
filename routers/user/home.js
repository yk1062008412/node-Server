/*
 * @Author: yk1062008412
 * @Date: 2020-01-01 12:54:25
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-02 15:26:30
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

router.post('/getGoodsList', function(req, res){
  homeModel.getGoodsList(req, res);
})

router.post('/getCategoryAndGoodsList', function(req, res){
  homeModel.getCategoryAndGoodsList(req, res);
})

module.exports = router;