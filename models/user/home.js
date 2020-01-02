/*
 * @Author: yk1062008412
 * @Date: 2020-01-01 12:55:53
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-02 16:20:36
 * @Description: home 首页
 */
const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();

// 获取商品信息列表
const getBannerList = (req, res) => {
  my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1 ORDER BY banner_index ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows })
  })
}

// 获取类目列表
const getCategoryList = (req, res) => {
  my_connection.query('SELECT * FROM goods_category WHERE del_flag = 0 AND category_status=1 ORDER BY category_index ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows })
  })
}

// 获取类目下的商品
const getGoodsList = (req, res) => {
  const { categoryId } = req.body;
  my_connection.query('SELECT * FROM goods_info WHERE del_flag = 0 AND goods_status=1 AND category_id=? ORDER BY goods_index ASC', [categoryId], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows })
  })
}

// 获取类目和类目下的商品
const getCategoryAndGoodsList = async (req, res) => {
  const [rows_category, fields_category] = await connection_promise.query('SELECT * FROM goods_category WHERE del_flag = 0 AND category_status=1 ORDER BY category_index ASC', []).catch(err => {
    throw err;
  })
  if(rows_category.length === 0){
    res.status(200).json({code: 0, data: []})
  }
  for(let i = 0; i < rows_category.length; i++){
      const [rows_goods, fields_goods] = await connection_promise.query('SELECT * FROM goods_info WHERE del_flag = 0 AND goods_status=1 AND category_id=? ORDER BY goods_index ASC', [rows_category[i].category_id]).catch(err => {
        throw err;
      })
      Object.assign(rows_category[i], {goodsList: rows_goods.length ? rows_goods : []})
  }
  res.status(200).json({code: 0, data: rows_category});
}

module.exports = {
  getBannerList,
  getCategoryList,
  getGoodsList,
  getCategoryAndGoodsList
}