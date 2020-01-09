/*
 * @Author: yk1062008412
 * @Date: 2019-11-23 22:58:06
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-09 16:16:48
 * @Description: 订单信息
 */
const express = require('express');
const router = express.Router();
const orderModel = require('../../models/admin/order');

// 获取订单列表
router.post('/getOrderList', function(req, res){
    orderModel.getOrderList(req, res);
})

// 获取订单详情
router.post('/getOrderDetail', function(req, res){
    orderModel.getOrderDetail(req, res);
})

// 修改订单信息(订单状态)
router.post('/orderStatusUpdate', function(req, res){
    orderModel.orderStatusUpdate(req, res);
})

// 修改订单信息(订单金额)
router.post('/orderAmountUpdate', function(req, res){
    orderModel.orderAmountUpdate(req, res);
})


module.exports = router;