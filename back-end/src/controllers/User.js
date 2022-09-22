const BaseController = require('./Base');

class UserController extends BaseController {
  constructor(service) {
    super(service);
    this.login = this.login.bind(this);
  }
  
  async login(req, res) {
    const token = await this.service.login(req.body);
    return res.status(200).json(token);
  }
}

module.exports = UserController;