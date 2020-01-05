/*
 * @Author: yk1062008412
 * @Date: 2020-01-03 22:40:07
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-04 23:11:08
 * @Description: h5配置信息
 */
const h5Conf = {
  appId: 'wx574472ef1e2aaebb', // appId
  appSecret: '81a9cd512a6efa23e31a001e10465b96', // appSecret
  decodeCodeUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token', // 获取用户access_token
  userInfoUrl: 'https://api.weixin.qq.com/sns/userinfo', // 获取用户信息URL
  unifiedOrderUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder', // 统一下单URL
  mChId: '1412578202', // 商户号
  deviceNum: 'WEB', // 设备号 --> PC网页或公众号内支付传'WEB'
  notifyUrl: 'http://www.baidu.com', // 微信支付结果通知的回调地址
  tradeType: 'JSAPI', // 交易类型 --> JSAPI支付
  mchKey: '12312dfafdsaffwevwew', // 支付平台设置的API密钥key
}

module.exports = h5Conf;