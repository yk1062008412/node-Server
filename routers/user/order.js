/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:22:07
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-11 20:06:35
 * @Description: mine 我的
 */
const express = require('express');
const router = express.Router();
const h5Pay = require('../../common/h5app_pay');
const orderModel = require('../../models/user/order');

// 用户下单
router.post('/saveOrder', function(req, res){
  orderModel.saveOrder(req, res)
})

// 提交订单
router.post('/submitOrder', function(req, res){
  orderModel.submitOrder(req, res)
})

// 微信支付结果通知的回调地址
router.post('/orderPoster', (req, res) => {
  console.log(req);
  console.log('调用了');
  res.status(200);
})

module.exports = router;