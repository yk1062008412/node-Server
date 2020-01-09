/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 20:40:56
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-05 15:24:26
 * @Description: banner轮播图
 */
const express = require('express');
const router = express.Router();
const bannerModel = require('../../models/admin/banner');

// 获取banner图列表
router.post('/getBannerList', function(req, res){
    bannerModel.getBannerList(req, res);
})

// 获取banner图信息
router.post('/getBannerInfo', function(req, res){
    bannerModel.getBannerInfo(req, res);
})

// 新增banner图
router.post('/bannerAdd', function(req, res){
    bannerModel.bannerAdd(req, res);
})

// 更新banner信息
router.post('/bannerUpdate', function(req, res){
    bannerModel.bannerUpdate(req, res);
})

// banner排序
router.post('/bannerSortUpdate', function(req, res){
    bannerModel.bannerSortUpdate(req, res);
})

// banner上下架
router.post('/bannerPopUp', function(req, res){
    bannerModel.bannerPopUp(req, res);
})

// banner删除
router.post('/bannerDelete', function(req, res){
    bannerModel.bannerDelete(req, res);
})

module.exports = router;