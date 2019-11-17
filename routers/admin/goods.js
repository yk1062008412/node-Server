/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 17:35:24
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 17:42:28
 * @Description: 商品信息
 */
const express = require('express');
const router = express.Router();
const goodsModel = require('../../models/admin/goods');

// 获取商品信息列表
router.post('/getGoodsList', function(req, res){
    goodsModel.getGoodsList(req, res);
})

// 获取商品详情
router.post('/getGoodsDetail', function(req, res){
    goodsModel.getGoodsList(req, res);
})

// 新增商品信息
router.post('/goodsAdd', function(req, res){
    goodsModel.goodsAdd(req, res);
})

// 修改商品信息
router.post('/goodsUpdate', function(req, res){
    goodsModel.goodsUpdate(req, res);
})

// 修改商品上下架状态
router.post('/goodsPopUp', function(req, res){
    goodsModel.goodsPopUp(req, res);
})

// 删除商品
router.post('/goodsDelete', function(req, res){
    goodsModel.goodsDelete(req, res);
})

module.exports = router;