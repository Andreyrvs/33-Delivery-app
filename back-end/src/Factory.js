const model = require('./database/models');

const UserRepository = require('./repository/User');
const UserService = require('./services/User');
const UserController = require('./controllers/User');

const SaleRepository = require('./repository/Sale');
const SaleProductRepository = require('./repository/SaleProduct');
const SaleService = require('./services/Sale');
const SaleController = require('./controllers/Sale');
const ProductRepository = require('./repository/Product');

class Factory {
  static user() {
    const userRepository = new UserRepository(model.User);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return { userController, userService, userRepository };
  }

  static sale() {
    const saleRepository = new SaleRepository(model.Sale);
    const saleProductRepository = new SaleProductRepository(model.SaleProduct);
    const productRepository = new ProductRepository(model.Product);
    const userRepository = new UserRepository(model.User);
    const saleService = new SaleService(
      saleRepository, saleProductRepository, productRepository, userRepository,
    );
    const saleController = new SaleController(saleService);
    return {
      saleController, saleService, saleRepository, saleProductRepository, productRepository,
    };
  }
}

module.exports = Factory;
