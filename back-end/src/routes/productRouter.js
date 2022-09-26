const express = require('express');
const Factory = require('../Factory');

const ProductController = Factory.product().productController;

const productRouter = express.Router();

productRouter.get('/customer/products', ProductController.read);

module.exports = productRouter;