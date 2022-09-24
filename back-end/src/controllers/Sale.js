const BaseController = require('./Base');

class SaleController extends BaseController {
  constructor(service) {
    super(service);
    this.create = this.create.bind(this);
  }
  
  async create(req, res) {
    const data = await this.service.create(req.body);
    return res.status(200).json(data);
  }
}

module.exports = SaleController;