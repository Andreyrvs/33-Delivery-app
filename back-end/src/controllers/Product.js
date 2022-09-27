const { httpStatusCode } = require('../helpers');

const BaseController = require('./Base');

class ProductController extends BaseController {
  constructor(service) {
    super(service);
    this.read = this.read.bind(this);
  }
  
  async read(_req, res) {
    const allProducts = await this.service.read();
    return res.status(httpStatusCode.OK).json(allProducts);
  }

  async readOne(req, res) {
    const product = await this.service.readOne(req.params.id);
    return res.status(httpStatusCode.OK).json(product);
  }
}

module.exports = ProductController;