/*
 * @Author: yk1062008412
 * @Date: 2019-11-23 22:58:22
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-09 17:17:13
 * @Description: 订单信息
 */
const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();
const getToken = require('../common/getToken');
const func = require('../common/func');

// 获取订单列表
const getOrderList = async (req, res) => {
    const { orderNumber, receiveUserName, nickname, telPhone, addressInfo, orderStatus, orderAddTimeStart, orderAddTimeEnd, 
        orderPayTimeStart, orderPayTimeEnd, orderSendTimeStart, orderSendTimeEnd, orderCompleteTimeStart,
        orderCompleteTimeEnd, orderExitTimeStart, orderExitTimeEnd, currentPage, pageSize } = req.body;
    const pageInfo = func.getLimitData(currentPage || 1, pageSize || 20);
    let selectSql = `SELECT uo.*, ua.receive_user_name, ua.tel_phone FROM user_order AS uo LEFT JOIN user_address AS ua ON uo.address_id = ua.address_id
        WHERE uo.del_flag=0`;
    let countSql = `SELECT count(*) AS count FROM user_order AS uo LEFT JOIN user_address AS ua ON uo.address_id = ua.address_id
        WHERE uo.del_flag=0`;
    let commonSql = func.geneSqlText('order_number', orderNumber)
        + func.geneSqlText('uo.nickname', nickname, 2)
        + func.geneSqlText('uo.address_info', addressInfo, 2)
        + func.geneSqlText('uo.order_status', orderStatus)
        + func.geneSqlText('ua.receive_user_name', receiveUserName, 2)
        + func.geneSqlText('ua.tel_phone', telPhone)
        + func.geneSqlText('uo.order_add_time', orderAddTimeStart, 3)
        + func.geneSqlText('uo.order_add_time', orderAddTimeEnd, 4)
        + func.geneSqlText('uo.order_pay_time', orderPayTimeStart, 3)
        + func.geneSqlText('uo.order_pay_time', orderPayTimeEnd, 4)
        + func.geneSqlText('uo.order_send_time', orderSendTimeStart, 3)
        + func.geneSqlText('uo.order_send_time', orderSendTimeEnd, 4)
        + func.geneSqlText('uo.order_complete_time', orderCompleteTimeStart, 3)
        + func.geneSqlText('uo.order_complete_time', orderCompleteTimeEnd, 4)
        + func.geneSqlText('uo.order_exit_time', orderExitTimeStart, 3)
        + func.geneSqlText('uo.order_exit_time', orderExitTimeEnd, 4);
    
    const resParam = {
        code: 0,
        data: [],
        pageInfo: {}
    }
    // 查询count
    const [rows_count, fields2] = await connection_promise.query(countSql + commonSql, []).catch(err => {
        throw err;
    })
    Object.assign(resParam.pageInfo, {
        count: rows_count[0]['count'],
        currentPage: currentPage,
        pageSize: pageSize
    });
    // 如果count是0，则直接return
    if(resParam.pageInfo.count === 0){
        return res.status(200).json(resParam);
    }
    // 查询订单列表
    const [rows_order, fields1] = await connection_promise.query(selectSql + commonSql + ' ORDER BY uo.last_edit_time DESC LIMIT ?, ?', [pageInfo[0], pageInfo[1]]).catch(err => {
        throw err;
    })
    // 查询订单详情
    for(let i = 0; i < rows_order.length; i++){
        const [order_detail_rows, fields_detail] = await connection_promise.query('SELECT * FROM order_info WHERE order_id = ?', [rows_order[i].order_id]).catch(err => {
          throw err;
        })
        Object.assign(rows_order[i], {orderDetail: order_detail_rows.length ? order_detail_rows : []})
    }

    resParam.data = rows_order;
    
    return res.status(200).json(resParam);
}

// 获取订单详情
const getOrderDetail = (req, res) => {
    const { orderId } = req.body;
    my_connection.query('SELECT * FROM order_info WHERE order_id=?', [orderId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows })
    })
}

// 修改订单信息(订单状态)
const orderStatusUpdate = async (req, res) => {
    const { orderStatus, orderId} = req.body;
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    if(!lastOperateAccount || lastOperateAccount === 'unKnown'){
        return res.status(200).json({ code: 998, des: '没有权限，拒绝操作' });
    }
    let updateSql = 'UPDATE user_order SET order_status=?, last_operate_account=? ';
    let currentTimeSql = '';
    const now = new Date();
    switch(+orderStatus){
        case 2: currentTimeSql = ', order_pay_time=?';break;
        case 3: currentTimeSql = ', order_send_time=?';break;
        case 4: currentTimeSql = ', order_complete_time=?';break;
        case 5: currentTimeSql = ', order_exit_time=?';break;
        default: currentTimeSql = ', last_edit_time=?';
    }
    my_connection.query(updateSql + currentTimeSql + ' WHERE order_id=?', [orderStatus, lastOperateAccount, now, orderId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '状态更新成功' });
    })
}

// 修改订单信息(订单金额)
const orderAmountUpdate = async (req, res) => {
    const { orderAmount, orderId} = req.body;
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    if(lastOperateAccount === 'unKnown'){
        return res.status(200).json({ code: 998, des: '没有权限，拒绝操作' });
    }
    my_connection.query('UPDATE user_order SET order_amount=?, last_operate_account=? WHERE order_id=?', [orderAmount, lastOperateAccount, orderId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '状态更新成功' });
    })
}

module.exports = {
    getOrderList,
    getOrderDetail,
    orderStatusUpdate,
    orderAmountUpdate
}
