/*
 * @Author: yk1062008412
 * @Date: 2019-11-18 23:02:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-18 23:54:48
 * @Description: 文件操作
 */
const my_connection = require('../../config/dbmysql2');
const tokenVerify = require('../../common/token_verify');


// 获取文件信息
const fileList = (req, res) => {
    my_connection.query('SELECT * FROM file_info WHERE del_flag = 0', [], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 新增文件
const fileAdd = async (req, res) => {
    // 获取上传文件的管理员名称
    const token = req.headers.authorization;
    let user_account = 'unKnown';
    await tokenVerify.verifyToken(token).then(data => {
        user_account = data.user_account;
    })
    // 获取文件信息
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size} = req.files[0];
    const filetype = (originalname).split('.').pop();
    const addSql = `INSERT INTO file_info (file_size, file_type, file_url,
        add_adm_account, filed_name, origin_name, encoding, mime_type, filename, destination)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    my_connection.query(addSql, [size, filetype, path, user_account, fieldname, originalname, encoding,
        mimetype, filename, destination], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: '文件上传成功'})
    })
}


module.exports = {
    fileList,
    fileAdd
}

