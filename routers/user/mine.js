/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:22:07
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-02 17:49:31
 * @Description: mine 我的
 */
const express = require('express');
const router = express.Router();
const mineModel = require('../../models/user/mine');

router.post('/getMineInfo', function(req, res){
  mineModel.getMineInfo(req, res);
})

router.post('/setMineInfo', function(req, res){
  // console.log(req);
  console.log('调用了哦~')
  return res.status(200).json({code: 0, des:'调用成功了!'})
})

module.exports = router;