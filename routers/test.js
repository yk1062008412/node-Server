const express = require('express');
const router = express.Router();
const TestModel = require('../models/test');

/**
 * Homepage request
 */
router.get('/', function (req, res) {
    res.send('Birds home page');
})
/**
 * BaseAPI usage method
 */
router.get('/userInfo', function (req, res) {
    res.send('userInfo request');
})
/**
 * Redirect function
 */
router.get('/redirect', function (req, res) {
    res.redirect('/userInfo');
})
/**
 * Get my data function
 */
router.post('/userName', function (req, res) {
    TestModel.getMyTestChracter(req, res);
})

module.exports = router;