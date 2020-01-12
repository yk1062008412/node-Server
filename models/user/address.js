/*
 * @Author: yk1062008412
 * @Date: 2020-01-02 16:28:09
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-12 22:40:57
 * @Description: address 地址
 */
const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();

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
  // 获取默认地址
  my_connection.query('SELECT * FROM user_address WHERE del_flag = 0 AND user_id=? AND is_default_address=1 ORDER BY update_time ASC', [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    // 如果没有默认地址，则获取最新一条操作过的地址
    if(rows.length === 0){
      my_connection.query('SELECT * FROM user_address WHERE del_flag = 0 AND user_id=? ORDER BY update_time ASC', [userId], (updateerr, updaterows) => {
        if(updateerr){
          throw updateerr;
        }
        return res.status(200).json({ code: 0, data: updaterows[0] || [] })
      })
    }else{
      return res.status(200).json({ code: 0, data: rows[0] })
    }
  })
}

// 新增地址
const addressAdd = async (req, res) => {
  const { userId, receiveUserName, province, city, district, detailAdd, telPhone, isDefaultAddress } = req.body;
  if(!userId){
    return res.status(200).json({ code: 999, des: '未登录，请先登录!' })
  }
  // 修改默认地址前先重置默认地址
  if(+isDefaultAddress === 1){
    const [updaterows, updatefields] = await connection_promise.query('UPDATE user_address SET is_default_address=0 WHERE user_id=?', [userId]).catch(err => {
      if(err){
        throw err;
      }
    })
  }
  const addSql = `INSERT INTO user_address (user_id, receive_user_name, province, city,
    district, detail_add, tel_phone, is_default_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const [insertrows, insertfields] = await connection_promise.query(addSql, [ userId, receiveUserName, province, city, district,
    detailAdd, telPhone, isDefaultAddress]).catch(err => {
    if(err){
      throw err;
    }
  })
  return res.status(200).json({ code: 0, des: '新增成功' })
}

// 获取地址详情
const getAddressInfo = (req, res) => {
  const { addressId } = req.body;
  my_connection.query('SELECT * FROM user_address WHERE address_id=?', [addressId], (err, rows) => {
    if(err){
      throw err
    }
    return res.status(200).json({ code: 0, data: rows[0] })
  })
}

// 编辑地址
const addressUpdate = async (req, res) => {
  const { addressId, userId, receiveUserName, province, city, district, detailAdd, telPhone, isDefaultAddress } = req.body;
  // 修改默认地址前先重置默认地址
  if(+isDefaultAddress === 1){
    const [updaterows, updatefields] = await connection_promise.query('UPDATE user_address SET is_default_address=0 WHERE user_id=?', [userId]).catch(err => {
      if(err){
        throw err;
      }
    })
  }
  const updateSql = `UPDATE user_address SET receive_user_name=?, province=?, city=?,
    district=?, detail_add=?, tel_phone=?, is_default_address=? WHERE address_id=?`;
  const [updaterows, updatefields] = await connection_promise.query(updateSql, [receiveUserName, province, city,
    district, detailAdd, telPhone, isDefaultAddress, addressId]).catch(err => {
    if(err){
      throw err;
    }
  })
  return res.status(200).json({ code: 0, des: '更新成功' })
}

// 删除地址
const addressDelete = (req, res) => {
  const { addressId } = req.body;
  my_connection.query('UPDATE user_address SET del_flag=1 WHERE address_id=?', [addressId], (err, rows) => {
    if(err){
      throw err;
    }
    return res.status(200).json({ code: 0, des: '删除成功' })
  })
}

module.exports = {
  getAddressList,
  getDefaultAddress,
  addressAdd,
  getAddressInfo,
  addressUpdate,
  addressDelete
}