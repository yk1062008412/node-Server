/*
 * @Author: yk1062008412
 * @Date: 2019-11-18 23:02:10
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-24 09:53:10
 * @Description: 文件操作
 */
const my_connection = require('../../config/dbmysql2');

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
    const user_account = await getToken.getUserAccount(req.headers.authorization);
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

// 修改文件信息
const fileEdit = (req, res) => {
    const { fileNumber, fileComment, imgUrlId } = req.body;
    my_connection.query('UPDATE file_info SET file_number=?, file_comment=? WHERE img_url_id=?', [fileNumber, fileComment, imgUrlId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: '修改成功'})
    })
}

// 删除图片文件
const fileDelete = (req, res) => {
    const { imgUrlId } = req.body;
    my_connection.query('UPDATE file_info SET del_flag=1 WHERE img_url_id=?', [imgUrlId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: '删除成功' })
    })
}


module.exports = {
    fileList,
    fileAdd,
    fileEdit,
    fileDelete
}

