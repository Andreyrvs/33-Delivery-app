const BaseService = require('./Base');
const ProductValidations = require('../validations/Products');

class ProductService extends BaseService {
  async read() {
    const allProducts = await this.repository.read();
    return allProducts;
  }

  async readOne(id) {
    ProductValidations.reqId(id);
    const product = await this.repository.readOne(id);
    ProductValidations.emptyProducts(product);
    return product;
  }
}

module.exports = ProductService;