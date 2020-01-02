/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:24:03
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-02 16:25:05
 * @Description: mine 我的
 */
const my_connection = require('../../config/dbmysql2');

const getMineInfo = (req, res) => {
  my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1 ORDER BY banner_index ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows })
  })
}

module.exports = {
  getMineInfo
}