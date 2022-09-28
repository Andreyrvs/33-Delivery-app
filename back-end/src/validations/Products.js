const { handleThrowError, httpStatusCode } = require('../helpers');

class ProductValidations {
  static reqId(id) {
    if (!id) handleThrowError('Id can\'t be empty', httpStatusCode.UNAUTHORIZED);
    if (id !== String) handleThrowError('Id must me an simple string', httpStatusCode.UNAUTHORIZED);
  }

  static emptyProducts(products) {
    if (!products || products.length === 0) {
      handleThrowError('Has no product in batabase', httpStatusCode.NOT_FOUND);
    }
  }
}

module.exports = ProductValidations;