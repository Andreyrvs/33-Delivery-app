const { httpStatusCode } = require('../helpers');
const BaseController = require('./Base');

class SaleController extends BaseController {
  constructor(service) {
    super(service);
    this.create = this.create.bind(this);
  }

  async read(_req, res) {
    const data = await this.service.read();
    return res.status(httpStatusCode.OK).json(data);
  }

  async readOne(req, res) {
    const order = await this.service.readOne(req.params.id);
    return res.status(httpStatusCode.OK).json(order);
  }

  // req.body: { userId: number, sellerId: number, totalPrice: number, deliveryAddress: string, deliveryNumber: string, products: Array<{ productId: number, quantity: number }> }
  async create(req, res) {
    const data = await this.service.create(req.body);
    return res.status(httpStatusCode.CREATED).json(data);
  }
}

module.exports = SaleController;