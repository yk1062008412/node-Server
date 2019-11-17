/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 17:35:13
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 20:34:00
 * @Description: 商品信息
 */
const my_connection = require('../../config/dbmysql2');

// 获取商品信息列表
const getGoodsList = (req, res) => {
    my_connection.query('SELECT * FROM goods_info WHERE del_flag = 0', [], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 获取商品详情
const getGoodsDetail = (req, res) => {
    const { goodsId } = req.body;
    my_connection.query('SELECT * FROM goods_info WHERE goods_id = ?', [goodsId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 新增商品信息
const goodsAdd = (req, res) => {
    const { categoryId, goodsName, goodsCode, stockPrice, costPrice, offPrice, goodsDesc,
        stock, goodsImgUrl, imgUrlId, goodsIndex, goodsStatus, comments } = req.body;
    const addSql = `INSERT INTO goods_info (
        category_id, goods_name, goods_code, stock_price, cost_price, off_price, goods_desc,
        stock, goods_img_url, img_url_id, goods_index, goods_status, comments) values (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    my_connection.query(addSql, [categoryId, goodsName, goodsCode, stockPrice, costPrice, offPrice,
        goodsDesc, stock, goodsImgUrl, imgUrlId, goodsIndex, goodsStatus, comments], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '新增成功'})
    })
}

// 修改商品信息
const goodsUpdate = (req, res) => {
    const { goodsId, categoryId, goodsName, stockPrice, costPrice, offPrice, goodsDesc, stock,
        goodsImgUrl, imgUrlId, goodsIndex, goodsStatus, comments } = req.body;
    const updateSql = `UPDATE goods_info SET category_id=?, goods_name=?, stock_price=?, cost_price=?, off_price=?,
        goods_desc=?, stock=?, goods_img_url=?, img_url_id=?, goods_index=?, goods_status=?, comments=? WHERE goods_id=?`
    my_connection.query(updateSql, [categoryId, goodsName, stockPrice, costPrice, offPrice, goodsDesc, stock,
        goodsImgUrl, imgUrlId, goodsIndex, goodsStatus, comments, goodsId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '更新成功' })
    })
}

// 修改商品上下架状态
const goodsPopUp = (req, res) => {
    const { goodsStatus, goodsId } = req.body;
    my_connection.query('UPDATE goods_info SET goods_status=? WHERE goods_id=?', [goodsStatus, goodsId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: goodsStatus === 1 ? '上架成功' : '下架成功' })
    })
}

// 修改商品类目排序
const goodsSortUpdate = (req, res) => {
    const { goodsIndex, goodsId } = req.body;
    my_connection.query('UPDATE goods_info SET goods_index=? WHERE goods_id=?)', [goodsIndex, goodsId], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '排序修改成功'});
    })
}

// 删除商品
const goodsDelete = (req, res) => {
    const { goodsId } = req.body;
    my_connection.query('UPDATE goods_info SET del_flag=1 WHERE goods_id=?)', [goodsId], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '删除成功'});
    })
}

module.exports = {
    getGoodsList,
    getGoodsDetail,
    goodsAdd,
    goodsUpdate,
    goodsPopUp,
    goodsSortUpdate,
    goodsDelete
}