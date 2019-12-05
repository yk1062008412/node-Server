/*
 * @Author: yk1062008412
 * @Date: 2019-11-23 22:58:22
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-05 23:58:51
 * @Description: 订单信息
 */
const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();
const func = require('../common/func');

// 获取订单列表
const getOrderList = async (req, res) => {
    const { orderNumber, nickname, addressInfo, orderStatus, payMode, orderAddTimeStart, orderAddTimeEnd, 
        orderPayTimeStart, orderPayTimeEnd, orderSendTimeStart, orderSendTimeEnd, orderCompleteTimeStart,
        orderCompleteTimeEnd, orderExitTimeStart, orderExitTimeEnd, currentPage, pageSize } = req.body;
    const pageInfo = func.getLimitData(currentPage || 1, pageSize || 20);
    let selectSql = `SELECT * FROM user_order
        WHERE del_flag=0`;
    let countSql = `SELECT count(*) AS count FROM user_order
        WHERE del_flag=0`;
    let commonSql = func.geneSqlText('order_number', orderNumber)
        + func.geneSqlText('nickname', nickname, 2)
        + func.geneSqlText('address_info', addressInfo, 2)
        + func.geneSqlText('order_status', orderStatus)
        + func.geneSqlText('pay_mode', payMode)
        + func.geneSqlText('order_add_time', orderAddTimeStart, 3)
        + func.geneSqlText('order_add_time', orderAddTimeEnd, 4)
        + func.geneSqlText('order_pay_time', orderPayTimeStart, 3)
        + func.geneSqlText('order_pay_time', orderPayTimeEnd, 4)
        + func.geneSqlText('order_send_time', orderSendTimeStart, 3)
        + func.geneSqlText('order_send_time', orderSendTimeEnd, 4)
        + func.geneSqlText('order_complete_time', orderCompleteTimeStart, 3)
        + func.geneSqlText('order_complete_time', orderCompleteTimeEnd, 4)
        + func.geneSqlText('order_exit_time', orderExitTimeStart, 3)
        + func.geneSqlText('order_exit_time', orderExitTimeEnd, 4);
    
    const resParam = {
        code: 0,
        data: [],
        pageInfo: {}
    }
    const [rows1, fields1] = await connection_promise.query(selectSql + commonSql + ' ORDER BY last_edit_time DESC LIMIT ?, ?', [pageInfo[0], pageInfo[1]]).catch(err => {
        throw err;
    })

    resParam.data = rows1;

    const [rows2, fields2] = await connection_promise.query(countSql + commonSql, []).catch(err => {
        throw err;
    })
    Object.assign(resParam.pageInfo, {
        count: rows2[0]['count'],
        currentPage: currentPage,
        pageSize: pageSize
    });
    
    res.status(200).json(resParam);
}

// 获取订单详情
const getOrderDetail = (req, res) => {
    const { orderId } = req.body;
    my_connection.query('SELECT * FROM order_info WHERE order_id=?', [orderId], (err, rows) => {
        if(err){
            throw err;
        }
        res.status(200).json({ code: 0, data: rows })
    })
}

// 修改订单信息(订单状态|订单金额)
const orderUpdate = (req, res) => {
    const { orderStatus, orderAmount, orderId} = req.body;
    my_connection.query('UPDATE user_order SET order_status=?, order_amount=? WHERE order_id=?', [orderStatus, orderAmount, orderId], (err, rows) => {
        if(err){
            throw err;
        }
        res.status(200).json({ code: 0, des: '更新成功' });
    })
}

module.exports = {
    getOrderList,
    getOrderDetail,
    orderUpdate
}
