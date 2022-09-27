const BaseService = require('./Base');

class ProductService extends BaseService {
  async read() {
    const allProducts = await this.repository.read();
    return allProducts;
  }

  async readOne(id) {
    const product = await this.repository.readOne(id);
    return product;
  }
}

module.exports = ProductService;