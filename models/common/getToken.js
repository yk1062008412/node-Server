/*
 * @Author: yk1062008412
 * @Date: 2019-11-21 22:33:37
 * @LastEditors  : carkang.yang@qunar.com
 * @LastEditTime : 2020-01-09 16:33:21
 * @Description: 获取token信息
 */
const tokenVerify = require('../../common/token_verify');

// 获取用户信息
const getUserAccount = async (token) => {
    if(!token) return;
    // const res = await tokenVerify.verifyToken(token);
    // return res.user_account || 'UnKnow';
    const res = await tokenVerify.verifyToken(token);
    return res.user_account || 'UnKnow';
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
