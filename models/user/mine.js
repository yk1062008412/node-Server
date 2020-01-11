/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:24:03
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-11 21:34:12
 * @Description: mine 我的
 */
const my_connection = require('../../config/dbmysql2');

const setUserInfoByWechat = (req, res, userInfo) => {
  const { city, country, headimgurl, language, nickname, openid, province, sex } = userInfo;
  // 新增之前先查询是否已经有该用户
  my_connection.query('SELECT * FROM user_info WHERE openid = ?', [openid], (err, rows) => {
    if (err) {
      throw err;
    }
    if(rows.length === 0){ // 没有该用户，新增用户
      let addSql = 'INSERT INTO user_info (openid, nickname, sex, language, city, province, country, head_img_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      my_connection.query(addSql, [openid, nickname, sex, language, city, province, country,headimgurl], (adderr, addrows) => {
        if (adderr) {
          throw adderr;
        }
        // 添加成功，重新查询
        my_connection.query('SELECT * FROM user_info WHERE openid = ?', [openid], (searcherr, searchrows) => {
          if (searcherr) {
            throw searcherr;
          }
          return res.status(200).json({ code: 0, data: searchrows[0] })
        })
      })
    }else{
      return res.status(200).json({ code: 0, data: rows[0] })
    }
  })
}

const getMineInfo = (req, res) => {
  my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1 ORDER BY banner_index ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows })
  })
}

module.exports = {
  setUserInfoByWechat,
  getMineInfo
}