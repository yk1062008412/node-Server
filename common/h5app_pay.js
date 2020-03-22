/*
 * @Author: yk1062008412
 * @Date: 2020-01-04 16:59:38
 * @LastEditors: yk1062008412
 * @LastEditTime: 2020-03-22 16:32:32
 * @Description: h5 支付
 */

const request = require('request');
const json2xml = require('json2xml');
const crypto = require('crypto');
const h5Conf = require('../config/h5app');

/**
 * @description: 统一下单function
 * @param {string} nonce_str 随机字符串
 * @param {string} order_desc 商品订单描述
 * @param {string} order_id 商品订单Id
 * @param {number} order_amount 商品价格(单位: 分)
 * @param {string} user_ip 用户ip地址
 * @param {string} openId 用户openId
 * @param {function} callback callback回调函数
 * @return: 
 */
exports.unifiedOrder = function({nonce_str, order_desc, order_id, order_amount, user_ip, openId}) {
  const { appId, mChId, deviceNum, unifiedOrderUrl, tradeType, notifyUrl } = h5Conf
  const param = {
    appid: appId,
    mch_id: mChId.trim(),
    device_info: deviceNum,
    nonce_str: nonce_str,
    sign_type: 'MD5',
    body: order_desc,
    out_trade_no: order_id,
    total_fee: order_amount,
    spbill_create_ip: user_ip,
    notify_url: notifyUrl,
    trade_type: tradeType,
    openid: openId
  }
  const sign = MSign(param);
  Object.assign(param, {sign: sign});
  const xmlparam = `<xml>${json2xml(param)}</xml>`;
  console.log(xmlparam)
  return new Promise((resolve, reject) => {
    request({
      url: unifiedOrderUrl,
      method: 'POST',
      body: xmlparam
    }, function(err, response, body){
      if(!err && response.statusCode === 200){
        resolve(body)
      }else{
        reject(err)
      }
    })
  })
}

//创建随机字符串;
exports.getRandomStr = function(length) {
  let value = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = "";
  for (let i = 0; i < length; i++) {
    let v = value[getRandomNumberSection(0, value.length - 1)];
    while (i === 0 && v === '0') {
      v = value[getRandomNumberSection(0, value.length - 1)];
    }
    result += v;
  }
  return result;
}

/* 使用的局部function */
//签名;
//mchkey是你在支付平台设置的一个API密钥
function MSign(param) {
  var string = raw(param);
  const { mchKey } = h5Conf;
  string = string + '&key=' + mchKey;	//key拼接在字符串最后面
  return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
}
//args是一个JSON，方法将json中的字段按照ASCII码从小到大排序，生成一个字符串key1=value1&key2=value2。 
function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}
//创建随机数;
function getRandomNumberSection(begin, end) {
  return Math.floor(Math.random() * (begin - end) + end);
}