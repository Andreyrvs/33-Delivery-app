const express = require('express');
const Factory = require('../Factory');
const SaleService = require('../services/Sale');

const SaleController = Factory.sale().saleController;

const saleRouter = express.Router();

saleRouter.get('/customer/checkout', SaleController.read);
saleRouter.post('/customer/checkout', SaleController.create);

module.exports = saleRouter;