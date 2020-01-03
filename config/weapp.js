/*
 * @Author: yk1062008412
 * @Date: 2020-01-01 09:59:16
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-01 12:50:17
 * @Description: weapp Config
 */
const weappConf = {
  appId: 'wx18275049303f7e2f', // appId
  mchId: '1412578202', // 商户号
  notifyUrl: 'http://www.test.com', // 异步接收微信支付结果通知的回调地址
  key: '123123213', // 商户设置的支付的key
  attach: '北京总店', // attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
  payUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder' // 统一下单接口
}

module.exports = weappConf;