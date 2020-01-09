/*
 * @Author: yk1062008412
 * @Date: 2020-01-04 17:58:32
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-04 23:17:09
 * @Description: order 订单模块
 */

const my_connection = require('../../config/dbmysql2');
const h5Pay = require('../../common/h5app_pay')

const submitOrder = (req, res) => {
  // my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1 ORDER BY banner_index ASC', [], (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }
  //   return res.status(200).json({ code: 0, data: rows })
  // })
  const param = {
    nonce_str: h5Pay.getRandomStr(31),
    order_desc: '订单描述',
    order_id: '20200104224744',
    order_amount: 1,
    user_ip: '127.0.0.1',
    openId: 'oOQfL04S5ULpajvFK88shWTR9QO8'
  }
  // 订单落库成功
  h5Pay.unifiedOrder({...param}).then(body => {
    // console.log(res)
    return res.status(200).json({code: 0, body: body})
  }).catch(err => {
    console.log(err)
  })
}
module.exports = {
  submitOrder
}