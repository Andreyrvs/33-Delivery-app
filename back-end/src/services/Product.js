const BaseService = require('./Base');

class ProductService extends BaseService {
  async read() {
    const allProducts = await this.repository.read();
    return allProducts;
  }
}

module.exports = ProductService;