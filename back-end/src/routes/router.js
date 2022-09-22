const express = require('express');
const userRouter = require('./userRouter');

const route = express.Router();

route.use(userRouter);

module.exports = route;