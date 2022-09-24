const express = require('express');
const userRouter = require('./userRouter');
const imageRouter = require('./imageRouter');
const saleRouter = require('./saleRouter');

const route = express.Router();

route.use(userRouter);
route.use(saleRouter);
route.use('/images', imageRouter);

module.exports = route;