const express = require('express');
const Factory = require('../Factory');

const ProductController = Factory.product().productController;

const productRouter = express.Router();

productRouter.get('/customer/products', ProductController.read);
productRouter.get('/customer/products/:id', ProductController.readOne);

module.exports = productRouter;