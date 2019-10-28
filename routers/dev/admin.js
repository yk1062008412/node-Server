const express = require('express');
const router = express.Router();
const adminModel = require('../../models/dev/admin');

router.post('/getAdmInfo', function(req, res){
    adminModel.getAdmInfo(req, res);
})

module.exports = router;