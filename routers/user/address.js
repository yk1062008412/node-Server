/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:28:57
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-12 21:30:07
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

// 获取地址详情
router.post('/getAddressInfo', function(req, res){
  addressModel.getAddressInfo(req, res);
})

// 更新地址信息
router.post('/addressUpdate', function(req, res){
  addressModel.addressUpdate(req, res);
})

// 删除地址
router.post('/addressDelete', function(req, res){
  addressModel.addressDelete(req, res);
})

module.exports = router;