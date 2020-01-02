/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:28:09
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-02 17:08:01
 * @Description: address 地址
 */
const my_connection = require('../../config/dbmysql2');

// 获取地址列表
const getAddressList = (req, res) => {
  const { userId } = req.body;
  if(!userId){
    return res.status(200).json({ code: 999, des: '未登录，请先登录!' })
  }
  my_connection.query('SELECT * FROM user_address WHERE del_flag = 0 AND user_id=? ORDER BY update_time ASC', [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows })
  })
}

// 获取默认地址
const getDefaultAddress = (req, res) => {
  const { userId } = req.body;
  if(!userId){
    return res.status(200).json({ code: 999, des: '未登录，请先登录!' })
  }
  my_connection.query('SELECT * FROM user_address WHERE del_flag = 0 AND user_id=? AND is_default_address=1 ORDER BY update_time ASC', [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ code: 0, data: rows[0] })
  })
}

// 新增地址
const addressAdd = (req, res) => {
  const { userId, receiveUserName, province, city, district, detailAdd, telPhone, isDefaultAddress } = req.body;
  if(!userId){
    return res.status(200).json({ code: 999, des: '未登录，请先登录!' })
  }
  // 修改默认地址前先重置默认地址
  if(+isDefaultAddress === 1){
    my_connection.query('UPDATE user_address SET is_default_address=0 WHERE user_id=?', [userId], (err, rows) => {
      if(err){
        throw err;
      }
    })
  }
  const addSql = `INSERT INTO user_address (user_id, receive_user_name, province, city,
    district, detail_add, tel_phone, is_default_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  my_connection.query(addSql, [ userId, receiveUserName, province, city, district,
    detailAdd, telPhone, isDefaultAddress], (err, rows) => {
      if(err){
        throw err;
    }
    return res.status(200).json({ code: 0, des: '新增成功' })
  })
}

module.exports = {
  getAddressList,
  getDefaultAddress,
  addressAdd
}