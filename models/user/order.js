/*
 * @Author: yk1062008412
 * @Date: 2020-01-04 17:58:32
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-11 22:57:35
 * @Description: order 订单模块
 */

const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();
const h5Pay = require('../../common/h5app_pay')

// 计算价格
const calcPrice = list => {
  let priceCount = 0;
  for(let i = 0; i < list.length; i++){
    let item = list[i];
    let cost_price = item.goods_info.cost_price;
    let off_price = item.goods_info.off_price;
    if(off_price == 0){ // 如果没有设置折扣价,则以原价为准
      priceCount += cost_price * 100 * item.goods_num
    }else{ // 设置了折扣价，则以折扣价为准
      priceCount += off_price * 100 * item.goods_num
    }
  }
  return priceCount / 100
}

// 生成订单号
const geneOrderNum = () => {
  const now = new Date();
  let year = (now.getFullYear()).toString(),
    month = (now.getMonth() + 1).toString(),
    day = (now.getDate()).toString(),
    hour = (now.getHours()).toString(),
    minutes = (now.getMinutes()).toString(),
    seconds = (now.getSeconds()).toString(),
    randomval = '';
  // 生成5位数的随机数
  for (let i = 0; i < 6; i++) {
    let mathdata = Math.floor(Math.random()*10)
    randomval += mathdata;
  }
  
  return year + month + day + hour + minutes + seconds + randomval;
}


// 用户下单
const saveOrder = async (req, res) => {
  const { shopcarList, userId, nickname, openid } = req.body;
  const goodsAmount = calcPrice(JSON.parse(shopcarList));
  const orderNumber = geneOrderNum();
  // 新增订单
  let addOrderSql = 'INSERT INTO user_order (order_number, user_id, openid, nickname, goods_amount, order_amount) VALUES (?, ?, ?, ?, ?, ?)';
  const [rows, field] = await connection_promise.query(addOrderSql, [orderNumber, userId, openid, nickname, goodsAmount, goodsAmount]).catch(err => {
    throw err;
  })
  // 查询新增的订单，订单号
  let getSql = 'SELECT order_id, order_number from user_order where order_id = (SELECT MAX(order_id) AS order_id from user_order)';
  const [getrows, getfield] = await connection_promise.query(getSql, []).catch(err => {
    throw err;
  })
  let exist_order_id = getrows[0].order_id;
  let exist_order_number = getrows[0].order_number;
  // 新增订单详情的商品
  let shopcarListArr = JSON.parse(shopcarList);
  for(let i = 0; i < shopcarListArr.length; i++){
    let item = shopcarListArr[i];
    let gi = item.goods_info;
    let addGoodsSql = 'INSERT INTO order_info (order_id, order_number, goods_id, goods_name, goods_img_url, img_url_id, cost_price, off_price, goods_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [addgoodsrows, addgoodsfield] = await connection_promise.query(addGoodsSql, [exist_order_id, exist_order_number, item.goods_id,
      gi.goods_name, gi.goods_img_url, gi.img_url_id, gi.cost_price, gi.off_price, item.goods_num]).catch(err => {
        throw err;
      })
  }
  return res.status(200).json({ code: 0, data: {
    order_id: exist_order_id,
    order_number: exist_order_number
  }})
}

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
  saveOrder,
  submitOrder
}