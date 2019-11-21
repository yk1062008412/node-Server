/*
 * @Author: yk1062008412
 * @Date: 2019-10-31 22:08:18
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-21 22:43:37
 * @Description: 登录信息
 */
const my_connection = require('../../config/dbmysql2');
const tokenVerify = require('../../common/token_verify');

// 登录系统
const loginSystem = (req, res) => {
    const { userName, passWord } = req.body;
    // console.log(req.body.userName, req.body.passWord);
    my_connection.query('SELECT * FROM admin_account WHERE adm_account = ? AND adm_passwd = md5(?) AND del_flag = 0', [userName, passWord], (err, rows) => {
        if(err){
            throw err;
        }
        if(rows.length){
            // res.status(200).send(resStatus.successParams('success', 0));
            req.session.userName = rows[0].userName;
            const { adm_name, adm_account, adm_phone, id } = rows[0];
            // 设置token
            tokenVerify.setToken(adm_name, adm_account, adm_phone, id).then(data => {
                return res.status(200).json({ code: 0, des: '登录成功', token: data})
            })
        }else{
            res.status(200).send({
                code: -1
            })
        }
    })
}

module.exports = {
    loginSystem
}