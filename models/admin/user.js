/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 22:02:52
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 22:09:19
 * @Description: 用户信息
 */
const my_connection = require('../../config/dbmysql2');

// 获取用户列表
const getUserList = (req, res) => {
    my_connection.query('SELECT * FROM user_info', [], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 获取用户信息
const getUserDetail = (req, res) => {
    const { userId } = req.body;
    my_connection.query('SELECT * FROM user_info WHERE user_id=?', [userId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows })
    })
}

module.exports = {
    getUserList,
    getUserDetail
}
