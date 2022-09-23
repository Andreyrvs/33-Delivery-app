const BaseController = require('./Base');

class ProductController extends BaseController {
  constructor(service) {
    super(service);
    this.read = this.read.bind(this);
  }
  
  async read(_req, res) {
    const allProducts = await this.service.read();
    return res.status(200).json(allProducts);
  }
}

module.exports = ProductController;