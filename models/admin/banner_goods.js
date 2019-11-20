/*
 * @Author: yk1062008412
 * @Date: 2019-11-20 22:18:36
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-20 22:55:13
 * @Description: banner图对应的商品
 */
const my_connection = require('../../config/dbmysql2');

// 获取banner图对应的商品列表
const getBannerGoodsList = (req, res) => {
    my_connection.query('SELECT * FROM banner_goods WHERE del_flag = 0 ORDER BY banner_goods_index ASC', [], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 新增banner图对应的商品
const bannerGoodsAdd = (req, res) => {
    const { bannerId, goodsId, bannerGoodsIndex } = req.body;
    const addSql = `INSERT INTO banner_goods (banner_id, goods_id, banner_goods_index) VALUES (?, ?, ?)`;
    my_connection.query(addSql, [bannerId, goodsId, bannerGoodsIndex], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: '添加成功!' })
    })
}

// 删除banner图对应的商品
const bannerGoodsDelete = (req, res) => {
    const { bannerGoodsId } = req.body;
    my_connection.query('UPDATE banner_goods SET del_flag=1 WHERE banner_goods_id=?', [bannerGoodsId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: '删除成功!' })
    })
}

// 修改banner图对应商品的排序
const bannerGoodsIndex = (req, res) => {
    const { bannerGoodsIndex, bannerGoodsId } = req.body;
    my_connection.query('UPDATE banner_goods SET banner_goods_index=? WHERE banner_goods_id=?', [bannerGoodsIndex, bannerGoodsId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: '排序修改成功!' })
    })
}

module.exports = {
    getBannerGoodsList,
    bannerGoodsAdd,
    bannerGoodsDelete,
    bannerGoodsIndex
}
