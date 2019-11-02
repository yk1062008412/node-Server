const express = require('express');
const router = express.Router();
const loginModel = require('../../models/admin/login');

router.post('/loginSystem', function(req, res){
    loginModel.loginSystem(req, res)
})

module.exports = router;