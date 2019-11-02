const jwt = require('jsonwebtoken');
const signkey = 'mes_qdhd_mobile_xhykjyxgs';

exports.setToken = function(userName, userId, adm_phone, id) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            user_name: userName,
            user_account: userId,
            user_phone: adm_phone,
            user_id: id
        }, signkey, { expiresIn: 10 });
        resolve(token);
    })
}

exports.verifyToken = function(token) {
    return new Promise((resolve, reject) => {
        const info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}