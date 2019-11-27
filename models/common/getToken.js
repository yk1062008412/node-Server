/*
 * @Author: yk1062008412
 * @Date: 2019-11-21 22:33:37
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-27 23:25:48
 * @Description: 获取token信息
 */
const tokenVerify = require('../../common/token_verify');

// 获取用户信息
const getUserAccount = async (token) => {
    if(!token) return;
    // const res = await tokenVerify.verifyToken(token);
    // return res.user_account || 'UnKnow';
    let user_account = 'unKnown'
    await tokenVerify.verifyToken(token).then(data => {
        user_account = data.user_account;
        return user_account;
    })

}

// 获取用户ID
const getUserId = async (token) => {
    if(!token) return;
    const res = await tokenVerify.verifyToken(token);
    return res.user_id;
    // let user_id = '';
    // tokenVerify.verifyToken(token).then(data => {
    //     user_id = data.user_id;
    //     return user_id;
    // })
}

module.exports = {
    getUserAccount,
    getUserId
}
