const express = require('express');
const app = express();

const testRouter = require('./routers/test');

app.use('/', testRouter);

module.exports = app;