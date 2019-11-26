/*
 * @Author: yk1062008412
 * @Date: 2019-11-21 22:33:37
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-24 09:47:30
 * @Description: 获取token信息
 */
const tokenVerify = require('../../common/token_verify');

// 获取用户信息
const getUserAccount = async(token) => {
    if(!token) return;
    let user_account = 'unKnown';
    await tokenVerify.verifyToken(token).then(data => {
        user_account = data.user_account;
        return user_account;
    })
}

module.exports = {
    getUserAccount
}
