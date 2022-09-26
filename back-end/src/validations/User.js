const { httpStatusCode } = require('../helpers');
const { joi } = require('../helpers');

class UserValidations {
  static login(obj) {
    joi.validateLoginJoi(obj, httpStatusCode.UNAUTHORIZED);
  }
}

module.exports = UserValidations;