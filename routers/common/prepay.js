/*
 * @Author: yk1062008412
 * @Date: 2019-12-30 23:50:59
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2019-12-31 00:24:43
 * @Description: 支付需要的方法
 */
const md5 = require('md5');
// 支付api 的 key
const PAY_API_KEY = 'key';

function getNonceStr() {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getPaySign(appId, timeStamp, nonceStr, package) {
  var stringA = 'appId=' + appId +
    '&nonceStr=' + nonceStr +
    '&package=' + package +
    '&signType=MD5' +
    '&timeStamp=' + timeStamp

  var stringSignTemp = stringA + '&key=' + PAY_API_KEY
  var sign = md5(stringSignTemp).toUpperCase()
  return sign
}

function getTradeId(attach) {
  var date = new Date().getTime().toString()
  var text = ""
  var possible = "0123456789"
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  var tradeId = 'ty_' + attach + '_' + date + text
  return tradeId
}

function getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price) {
  var stringA = 'appid=' + appId +
    '&attach=' + attach +
    '&body=' + productIntro +
    '&mch_id=' + mchId +
    '&nonce_str=' + nonceStr +
    '&notify_url=' + notifyUrl +
    '&openid=' + openId +
    '&out_trade_no=' + tradeId +
    '&spbill_create_ip=' + ip +
    '&total_fee=' + price +
    '&trade_type=JSAPI'
  var stringSignTemp = stringA + '&key=' + PAY_API_KEY
  var sign = md5(stringSignTemp).toUpperCase()
  return sign
}

function wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price, sign) {
  const sendData = '<xml>' +
    '<appid>' + appId + '</appid>' +
    '<attach>' + attach + '</attach>' +
    '<body>' + productIntro + '</body>' +
    '<mch_id>' + mchId + '</mch_id>' +
    '<nonce_str>' + nonceStr + '</nonce_str>' +
    '<notify_url>' + notifyUrl + '</notify_url>' +
    '<openid>' + openId + '</openid>' +
    '<out_trade_no>' + tradeId + '</out_trade_no>' +
    '<spbill_create_ip>' + ip + '</spbill_create_ip>' +
    '<total_fee>' + price + '</total_fee>' +
    '<trade_type>JSAPI</trade_type>' +
    '<sign>' + sign + '</sign>' +
    '</xml>'
  return sendData
}

function getPayParams(prepayId, tradeId) {
  const nonceStr = getNonceStr()
  const timeStamp = new Date().getTime().toString()
  const package = 'prepay_id=' + prepayId
  const paySign = getPaySign(appId, timeStamp, nonceStr, package)
  // 前端需要的所有数据, 都从这里返回过去
  const payParamsObj = {
    nonceStr: nonceStr,
    timeStamp: timeStamp,
    package: package,
    paySign: paySign,
    signType: 'MD5',
    tradeId: tradeId,
  }
  return payParamsObj
}

module.exports = {
  getNonceStr,
  getPaySign,
  getTradeId,
  getPrePaySign,
  wxSendData,
  getPayParams
}