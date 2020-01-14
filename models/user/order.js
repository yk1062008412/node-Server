/*
 * @Author: yk1062008412
 * @Date: 2020-01-04 17:58:32
 * @LastEditors  : yk1062008412
 * @LastEditTime : 2020-01-15 00:21:38
 * @Description: order 订单模块
 */

const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();
const h5Pay = require('../../common/h5app_pay')
const func = require('../common/func');

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

// 查询订单
const orderDetail = async (req, res) => {
  const { orderId } = req.body;
  // 查询订单详情
  let selOrderSql = 'SELECT uo.*, ua.receive_user_name, ua.tel_phone FROM user_order AS uo LEFT JOIN user_address AS ua ON uo.address_id = ua.address_id WHERE uo.del_flag=0 AND uo.order_id=?';
  const [orderrows, orderfields] = await connection_promise.query(selOrderSql, [orderId]).catch(err => {
    throw err;
  })
  Object.assign(resData, {...orderrows[0]})
  // 查询订单内的商品详情
  let selGoodsSql = 'SELECT * FROM order_info WHERE order_id=?'
  const [goodsrows, goodsfields] = await connection_promise.query(selGoodsSql, [orderId]).catch(goodserr => {
    throw goodserr;
  })
  Object.assign(resData,{ goodsList: goodsrows})
  // 返回res
  res.status(200).json({code: 0, data: resData})
}

// 提交订单并结算
const submitOrder = async (req, res) => {
  // my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1 ORDER BY banner_index ASC', [], (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }
  //   return res.status(200).json({ code: 0, data: rows })
  // })
  // 
  const {order_id, address_id, address_info, book_time, comments} = req.body;
  // 更新订单信息
  let updateSql = 'UPDATE user_order SET address_id=?, address_info=?, book_time=?, comments=? WHERE order_id=?';
  const [uprows, upfields] = await connection_promise.query(updateSql,[address_id, address_info, book_time, comments, order_id]).catch(uperr => {
    if(uperr) {
      throw uperr
    }
  })
  return res.status(200).json({code: 0, data: '更新成功'})
  // 开始下单
  // const param = {
  //   nonce_str: h5Pay.getRandomStr(31),
  //   order_desc: '订单描述',
  //   order_id: '20200104224744',
  //   order_amount: 1,
  //   user_ip: '127.0.0.1',
  //   openId: 'oOQfL04S5ULpajvFK88shWTR9QO8'
  // }
  // // 订单落库成功
  // h5Pay.unifiedOrder({...param}).then(body => {
  //   // console.log(res)
  //   return res.status(200).json({code: 0, body: body})
  // }).catch(err => {
  //   console.log(err)
  // })
}

// 查询用户的所有订单
const orderAllDetail = async (req, res) => {
  const { openId, orderStatus, currentPage, pageSize } = req.body;
  const resParam = {
    code: 0,
    data: [],
    pageInfo: {}
  }
  const pageLimit= func.getLimitData(currentPage || 1, pageSize || 10);

  // 查询订单详情
  let selOrderSql = 'SELECT uo.*, ua.receive_user_name, ua.tel_phone FROM user_order AS uo LEFT JOIN user_address AS ua ON uo.address_id = ua.address_id WHERE uo.del_flag=0 AND uo.openid=?';
  let countSql = `SELECT count(*) AS count FROM user_order AS uo LEFT JOIN user_address AS ua ON uo.address_id = ua.address_id WHERE uo.del_flag=0 AND uo.openid=?`;
  let commonSql = (+orderStatus === 0) ? '' : ` AND order_status=${my_connection.escape(orderStatus)}`
  // 查询count
  const [countrows, countfields] = await connection_promise.query(countSql + commonSql, [openId]).catch(err => {
    console.log(countfields)
    throw err;
  })
  Object.assign(resParam.pageInfo, {
      count: countrows[0]['count'],
      currentPage: currentPage,
      pageSize: pageSize
  });
  // 如果count是0，则直接return
  if(resParam.pageInfo.count === 0){
    return res.status(200).json(resParam);
  }
  // 查询订单列表
  const [orderrows, orderfields] = await connection_promise.query(selOrderSql + commonSql + ' ORDER BY uo.last_edit_time DESC LIMIT ?, ?', [openId, pageLimit[0], pageLimit[1]]).catch(ordererr => {
    throw ordererr;
  })
  console.log(orderrows.sql);
  // 查询订单内的商品详情
  for(let i = 0; i < orderrows.length; i++){
    const [goodsrows, goodsfields] = await connection_promise.query('SELECT * FROM order_info WHERE order_id = ?', [orderrows[i].order_id]).catch(goodserr => {
      console.log(goodsfields)
      throw goodserr;
    })
    Object.assign(orderrows[i],{ goodsList: goodsrows.length ? goodsrows : []})
  }
  resParam.data = orderrows;
  // 返回res
  res.status(200).json(resParam)
}



module.exports = {
  saveOrder,
  orderDetail,
  submitOrder,
  orderAllDetail
}