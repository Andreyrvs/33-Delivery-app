const { handleThrowError } = require('../helpers');

class SaleValidations {
  static async checkProducts(products, repository) {
    const productIds = products.map(({ productId }) => productId);
    const counted = await repository.coutByIds(productIds);
    if (counted !== productIds.length) { 
      handleThrowError('One or more products doesn\'t exist in database', 404);
    }
  }
}

module.exports = SaleValidations;