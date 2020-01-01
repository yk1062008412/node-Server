/*
 * @Author: yk1062008412
 * @Date: 2019-12-30 23:01:19
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-01 12:52:13
 * @Description: 小程序支付
 */
const express = require('express');
const router = express.Router();
const request = require('request');
const prePay = require('./prepay');
const weappConf = require('../../config/weapp');

// 统一下单
router.post('/paySign', (req, res) => {
  const appId = weappConf.appId
  // 商户号
  const mchId = weappConf.mchId

  const notifyUrl = weappConf.notifyUrl
  // attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
  const attach = weappConf.attach
  // 一个随机字符串
  const nonceStr = prePay.getNonceStr()
  // 用户的 openId
  const openId = 'useropenId'
  // 生成商家内部自定义的订单号, 商家内部的系统用的, 理论上只要不和其他订单重复, 使用任意的字符串都是可以的
  const tradeId = prePay.getTradeId(attach)
  // 商品描述
  const productIntro = '这是测试例子'
  // 价格
  const price = 1
  // 这里是在 express 获取用户的 ip, 因为使用了 nginx 的反向代理, 所以这样获取
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ip = ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
  // 生成签名
  const sign = prePay.getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price)
  // 将微信需要的数据拼成 xml 发送出去
  const sendData = prePay.wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price, sign)
  console.log(sendData);
  request({
    url: weappConf.payUrl,
    method: 'POST',
    body: sendData
  }, function(error, response, body){
    if(error){
      console.log(error)
    }else{
      console.log(body)
    }
  });
})

module.exports = router