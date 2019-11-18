/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 22:24:20
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-18 23:48:11
 * @Description: 文件上传
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const file = require('../../models/common/file')

const createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

const uploadFolder = 'uploadFile/';

createFolder(uploadFolder);

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder, {abc: '456'}, '012');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        const filetype = (file.originalname).split('.').pop();
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        const filename = file.fieldname + '_' + Date.now() + '.' + filetype;
        cb(null, filename);  
    }
});

const upload = multer({ storage: storage })

// 上传文件
router.post('/uploadFile', upload.any() ,function(req, res, next){
    if(req.files[0]){
        file.fileAdd(req, res);
    }
})

module.exports = router;