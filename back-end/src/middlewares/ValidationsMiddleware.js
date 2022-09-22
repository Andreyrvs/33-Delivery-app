const { joi } = require('../helpers');
require('express-async-errors');

class ValidationsMiddleware {
  static user(req, _res, next) {
    joi.validateUserJoi(req.body, 401);
    next();
  }
}

module.exports = ValidationsMiddleware;