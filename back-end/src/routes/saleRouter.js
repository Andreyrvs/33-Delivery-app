const express = require('express');
const Factory = require('../Factory');

const SaleController = Factory.sale().saleController;

const saleRouter = express.Router();

saleRouter.get('/orders', SaleController.read);
saleRouter.get('/customer/orders/:id', SaleController.readByCustomerId);
saleRouter.get('/seller/orders/:id', SaleController.readBySellerId);
saleRouter.post('/customer/checkout', SaleController.create);

module.exports = saleRouter;