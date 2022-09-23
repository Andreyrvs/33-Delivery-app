const express = require('express');
const userRouter = require('./userRouter');
const imageRouter = require('./imageRouter');

const route = express.Router();

route.use(userRouter);
route.use('/images', imageRouter);

module.exports = route;