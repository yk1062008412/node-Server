/*
 * @Author: yk1062008412
 * @Date: 2019-11-20 22:09:44
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-20 23:00:00
 * @Description: banner对应的商品
 */
const express = require('express');
const router = express.Router();
const bannerGoodsModel = require('../../models/admin/banner_goods');

// 获取banner图对应的商品列表
router.post('/getBannerGoodsList', function(req, res){
    bannerGoodsModel.getBannerGoodsList(req, res);
})

// 新增banner图对应的商品
router.post('/bannerGoodsAdd', function(req, res){
    bannerGoodsModel.bannerGoodsAdd(req, res);
})

// 删除banner图对应的商品
router.post('/bannerGoodsDelete', function(req, res){
    bannerGoodsModel.bannerGoodsDelete(req, res);
})

// 修改banner图对应商品的排序
router.post('/bannerGoodsIndex', function(req, res){
    bannerGoodsModel.bannerGoodsIndex(req, res);
})

module.exports = router;