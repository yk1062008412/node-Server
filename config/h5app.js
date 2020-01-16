/*
 * @Author: yk1062008412
 * @Date: 2020-01-03 22:40:07
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-16 23:15:46
 * @Description: h5配置信息
 */
const h5Conf = {
  appId: 'wx3715770a164499c5', // appId
  appSecret: '61539e313bf03b8bda6def4dde21a826', // appSecret
  decodeCodeUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token', // 获取用户access_token
  userInfoUrl: 'https://api.weixin.qq.com/sns/userinfo', // 获取用户信息URL
  unifiedOrderUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder', // 统一下单URL
  mChId: '1574121061', // 商户号
  deviceNum: 'WEB', // 设备号 --> PC网页或公众号内支付传'WEB'
  notifyUrl: 'http://192.168.0.112:3001/user/order/orderPoster', // 微信支付结果通知的回调地址
  tradeType: 'JSAPI', // 交易类型 --> JSAPI支付
  mchKey: 'a610525199108082239a18840286928a', // 支付平台设置的API密钥key
}

module.exports = h5Conf;