/*
 * @Author: yk1062008412
 * @Date: 2019-11-23 22:58:06
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-23 23:34:50
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

// 修改订单信息(订单状态|订单金额)
router.post('/orderUpdate', function(req, res){
    orderModel.orderUpdate(req, res);
})

module.exports = router;