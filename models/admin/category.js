/*
 * @Author: yk1062008412
 * @Date: 2019-10-31 22:08:18
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-04 22:57:14
 * @Description: 商品类目信息
 */
const my_connection = require('../../config/dbmysql2');

// 获取商品类目列表
const getCategoryList = (req, res) => {
    my_connection.query('SELECT * FROM goods_category WHERE del_flag = 0 ORDER BY update_time DESC', [], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 获取商品类目详情
const getCategoryDetail = (req, res) => {
    const { categoryId } = req.body;
    my_connection.query('SELECT * FROM goods_category WHERE category_id = ?', [categoryId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows[0]})
    })
}

// 新增商品类目
const categoryAdd = (req, res) => {
    const { categoryName, comments, categoryIndex, categoryStatus } = req.body;
    my_connection.query('INSERT INTO goods_category (category_name, comments, category_index, category_status) VALUES (?, ?, ?, ?)', [categoryName, comments, categoryIndex, categoryStatus], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '新增成功' });
    })
}

// 修改商品类目
const categoryUpdate = (req, res) => {
    const { categoryName, comments, categoryIndex, categoryStatus, categoryId } = req.body;
    my_connection.query('UPDATE goods_category SET category_name=?, comments=?, category_index=?, category_status=? WHERE category_id=?', [categoryName, comments, categoryIndex, categoryStatus, categoryId], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '修改成功' });
    })
}

// 修改商品类目上下架状态
const categoryPopUp = (req, res) => {
    const { categoryStatus, categoryId } = req.body;
    my_connection.query('UPDATE goods_category SET category_status=? WHERE category_id=?', [categoryStatus, categoryId], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: categoryStatus === 1 ? '上架成功' : '下架成功' });
    })
}

// 修改商品类目排序
const categorySortUpdate = (req, res) => {
    const { categoryIndex, categoryId } = req.body;
    my_connection.query('UPDATE goods_category SET category_index=? WHERE category_id=?', [categoryIndex, categoryId], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '修改成功'});
    })
}

// 删除商品类目
const categoryDelete = (req, res) => {
    const { categoryId } = req.body;
    my_connection.query('UPDATE goods_category SET del_flag=1 WHERE category_id=?', [categoryId], (err,rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '删除成功'});
    })
}

module.exports = {
    getCategoryList,
    getCategoryDetail,
    categoryAdd,
    categoryUpdate,
    categoryPopUp,
    categorySortUpdate,
    categoryDelete
}