/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 22:24:20
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 23:13:23
 * @Description: 文件上传
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploadFile/' })

// 上传文件
router.post('/uploadFile', upload.any() ,function(req, res, next){
    console.log('11111');
    if(req.file){
        console.log('has file value');
    }
    if(req.files){
        console.log(req.files);
    }
    res.status(200).json({ code: 0, data: 'ok'})
})

router.post('/test', function(req, res){
    res.status(200).json({ code: 0, data: 'ok111' })
})

module.exports = router;