// const { handleThrowError } = require('../helpers');
const { joi } = require('../helpers');

class UserValidations {
  static login(obj) {
    joi.validateLoginJoi(obj, 401);
  }
}

module.exports = UserValidations;