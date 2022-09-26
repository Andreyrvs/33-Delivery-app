const express = require('express');
const Factory = require('../Factory');

const SaleController = Factory.sale().saleController;

const saleRouter = express.Router();

saleRouter.get('/customer/orders', SaleController.read);
saleRouter.get('/customer/orders/:id', SaleController.readOne);
saleRouter.post('/customer/checkout', SaleController.create);

module.exports = saleRouter;