const express = require('express');
const Factory = require('../Factory');

const SaleController = Factory.sale().saleController;

const saleRouter = express.Router();

saleRouter.post('/sale', SaleController.create);

module.exports = saleRouter;