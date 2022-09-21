const express = require('express');
const loginRouter = require('./loginRouter');

const route = express.Router();

route.use(loginRouter);

module.exports = route;