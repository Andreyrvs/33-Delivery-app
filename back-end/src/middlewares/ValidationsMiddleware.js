const { joi, httpStatusCode } = require('../helpers');
require('express-async-errors');

class ValidationsMiddleware {
  static user(req, _res, next) {
    joi.validateUserJoi(req.body, httpStatusCode.UNAUTHORIZED);
    next();
  }
}

module.exports = ValidationsMiddleware;