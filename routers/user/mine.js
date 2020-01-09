/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:22:07
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-04 17:10:56
 * @Description: mine 我的
 */
const express = require('express');
const router = express.Router();
const request = require('request');
const h5Conf = require('../../config/h5app');
const mineModel = require('../../models/user/mine');

router.post('/getMineInfo', function(req, res){
  mineModel.getMineInfo(req, res);
})

router.post('/setMineInfo', function(req, res){
  const { authCode } = req.body;
  if(authCode){
    const {appId, appSecret, decodeCodeUrl, userInfoUrl} = h5Conf;
    request({
      url: `${decodeCodeUrl}?appid=${appId}&secret=${appSecret}&code=${authCode}&grant_type=authorization_code`,
      method: 'POST'
    }, function(error, response, body){
      if(response.statusCode=== 200){ // openid获取成功
        // return res.status(200).json({code: 0, des:'获取code内信息错误!'})
        const {access_token, openid} = JSON.parse(body);
        request.get({
          url: `${userInfoUrl}?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        }, function(err2, response2, body2){
          if(response2.statusCode === 200) { // 用户信息获取成功
            return res.status(200).json({code: 0, data: JSON.parse(body2)})
          }else{ // 用户信息获取失败
            return res.status(200).json({code: 999, des: err2})
          }
        })
      }else{ // openid获取失败
        return res.status(200).json({code: 999, des: error})
      }
    });
  }else{ // 前端没有传code
    return res.status(200).json({code: 999, des:'没有获取到code!'})
  }
})

module.exports = router;