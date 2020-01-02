/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:28:57
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-02 16:49:55
 * @Description: address 地址
 */
const express = require('express');
const router = express.Router();
const addressModel = require('../../models/user/address');

// 获取地址列表
router.post('/getAddressList', function(req, res){
  addressModel.getAddressList(req, res);
})

// 获取默认地址
router.post('/getDefaultAddress', function(req, res){
  addressModel.getDefaultAddress(req, res);
})

// 新增地址
router.post('/addressAdd', function(req, res){
  addressModel.addressAdd(req, res);
})

module.exports = router;