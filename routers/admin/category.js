/*
 * @Author: yk1062008412
 * @Date: 2019-11-15 22:36:59
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 20:54:51
 * @Description: 商品类目
 */
const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/admin/category');

// 获取商品类目列表
router.post('/getCategoryList', function(req, res){
    categoryModel.getCategoryList(req, res);
})

// 获取商品类目详情
router.post('/getCategoryDetail', function(req, res){
    categoryModel.getCategoryDetail(req, res);
})

// 新增商品类目
router.post('/categoryAdd', function(req, res){
    categoryModel.categoryAdd(req, res);
})

// 修改商品类目
router.post('/categoryUpdate', function(req, res){
    categoryModel.categoryUpdate(req, res);
})

// 修改商品类目上下架状态
router.post('/categoryPopUp', function(req, res){
    categoryModel.categoryPopUp(req, res);
})

// 修改商品类目排序
router.post('/categorySortUpdate', function(req, res){
    categoryModel.categorySortUpdate(req, res);
})

// 删除类目信息
router.post('/categoryDelete', function(req, res){
    categoryModel.categoryDelete(req, res);
})

module.exports = router;