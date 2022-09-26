const model = require('./database/models');

const UserRepo = require('./repository/User');
const UserService = require('./services/User');
const UserController = require('./controllers/User');

const SaleRepository = require('./repository/Sale');
const SaleProductRepository = require('./repository/SaleProduct');
const SaleService = require('./services/Sale');
const SaleController = require('./controllers/Sale');
const ProductRepository = require('./repository/Product');

class Factory {
  static user() {
    const userRepo = new UserRepo(model.User);
    const userService = new UserService(userRepo);
    const userController = new UserController(userService);
    return { userController, userService, userRepo };
  }

  static sale() {
    const saleRepository = new SaleRepository(model.Sale);
    const saleProductRepository = new SaleProductRepository(model.SaleProduct);
    const productRepository = new ProductRepository(model.Product);
    const saleService = new SaleService(saleRepository, saleProductRepository, productRepository);
    const saleController = new SaleController(saleService);
    return {
      saleController, saleService, saleRepository, saleProductRepository, productRepository,
    };
  }
}

module.exports = Factory;
