/*
 * @Author: yk1062008412
 * @Date: 2020-01-01 12:55:53
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-01 22:33:00
 * @Description: home 首页
 */
const my_connection = require('../../config/dbmysql2');

// 获取商品信息列表
const getBannerList = (req, res) => {
  my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1 ORDER BY banner_index ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows[0] })
  })
}

// 获取类目列表和商品
const getCategoryList = (req, res) => {

}

module.exports = {
  getBannerList,
  getCategoryList
}