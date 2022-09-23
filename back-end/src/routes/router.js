const express = require('express');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');

const route = express.Router();

route.use(userRouter);
route.use(productRouter);

module.exports = route;