/*
 * @Author: yk1062008412
 * @Date: 2019-11-20 22:59:03
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-24 09:49:31
 * @Description: 系统账号
 */
const my_connection = require('../../config/dbmysql2');
const connection_promise = my_connection.promise();
const getToken = require('../common/getToken');
const func = require('../common/func');
const DEFAULT_PWD = 123456;

// 获取系统管理员列表
const getAdmAccountList = async (req, res) => {
    const { currentPage, pageSize } = req.body;

    const pageInfo = func.getLimitData(currentPage || 1, pageSize || 20);
    let selectSql = 'SELECT ac.* FROM admin_account ac WHERE del_flag = 0';
    let countSql = 'SELECT count(1) FROM admin_account ac WHERE del_flag = 0';
    let commonSql = '';
    const resParam = {
        code: 0,
        data: [],
        pageInfo: {}
    };

    // 查询count
    const [rows_count, fields2] = await connection_promise.query(countSql + commonSql, []).catch(err => {
        throw err;
    });
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
    const [rows_order, fields1] = await connection_promise.query(selectSql + commonSql + ' ORDER BY ac.update_time DESC LIMIT ?, ?', [pageInfo[0], pageInfo[1]]).catch(err => {
        throw err;
    })

    resParam.data = rows_order;
    
    return res.status(200).json(resParam);
}

// 获取系统管理员详情
const getAdmAccountDetail = (req, res) => {
    const { id } = req.body;
    my_connection.query('SELECT * FROM admin_account WHERE id=?', [id], (err, rows) => {
        if(err){
            throw err;
        }
        let resData = {}
        if (rows.length) {
            resData = rows[0];
        }
        return res.status(200).json({ code: 0, data: resData })
    })
}

// 新增系统管理员
const admAccountAdd = async (req, res) => {
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    const { admAccount, admName, admPhone, admComments } = req.body;
    const addSql = `INSERT INTO admin_account (adm_account, adm_name, adm_phone, adm_passwd,
        adm_comments, last_operate_account) VALUES (?, ?, ?, MD5(?), ?, ?)`;
    my_connection.query(addSql, [admAccount, admName, admPhone, DEFAULT_PWD, admComments, lastOperateAccount], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '新增成功' })
    })
}

// 更新系统管理员信息
const admAccountUpdate = async (req, res) => {
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    const { admAccount, admName, admPhone, admPasswd, admComments, superAdm, id } = req.body;
    // const updateSql = `UPDATE admin_account SET adm_account=?, adm_name=?, adm_phone=?, adm_passwd=MD5(?),
    //     adm_comments=?, super_adm=?, last_operate_account=? WHERE id=?`;
    // my_connection.query(updateSql, [admAccount, admName, admPhone, admPasswd, admComments, superAdm, lastOperateAccount, id], (err, rows) => {
    //     if(err){
    //         throw err;
    //     }
    //     return res.status(200).json({ code: 0, des: '更新成功' })
    // })
    const updateSql = `UPDATE admin_account SET adm_account=?, adm_name=?, adm_phone=?,
        adm_comments=?, super_adm=?, last_operate_account=? WHERE id=?`;
    my_connection.query(updateSql, [admAccount, admName, admPhone, admComments, superAdm, lastOperateAccount, id], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '更新成功' })
    })
}

// 删除系统管理员
const admAccountDelete = async (req, res) => {
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    const { id } = req.body;
    const delSql = `UPDATE admin_account SET del_flag=1, last_operate_account=? WHERE id=?`;
    my_connection.query(delSql, [lastOperateAccount, id], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '删除成功' })
    })
}

// 修改系统管理员密码
const admAccountPwdChange = async (req, res) => {
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    const { id, admPasswd } = req.body;
    my_connection.query('UPDATE admin_account SET adm_passwd=MD5(?), last_operate_account=? WHERE id=?', [admPasswd, lastOperateAccount, id], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '修改成功' })
    })
}

// 重置系统管理员密码
const admAccountResetPwd = async (req, res) => {
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    const { id } = req.body;
    my_connection.query('UPDATE admin_account SET adm_passwd=MD5(?), last_operate_account=? WHERE id=?', [DEFAULT_PWD, lastOperateAccount, id], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '重置成功' })
    })
}

// 设置,取消超级管理员(超级管理员多了添加管理员功能)
const admAccountSuper = async (req, res) => {
    // 获取当前管理员账号
    const lastOperateAccount = await getToken.getUserAccount(req.headers.authorization);
    const { id, superAdm } = req.body;
    my_connection.query('UPDATE admin_account SET super_adm=?, last_operate_account=? WHERE id=?', [superAdm, lastOperateAccount, id], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '设置成功' })
    })
}

module.exports = {
    getAdmAccountList,
    getAdmAccountDetail,
    admAccountAdd,
    admAccountUpdate,
    admAccountDelete,
    admAccountPwdChange,
    admAccountResetPwd,
    admAccountSuper
}