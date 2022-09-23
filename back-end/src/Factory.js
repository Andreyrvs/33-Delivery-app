const model = require('./database/models');
const UserRepository = require('./repository/User');
const UserService = require('./services/User');
const UserController = require('./controllers/User');
const ProductRepository = require('./repository/Product');
const ProductService = require('./services/Product');
const ProductController = require('./controllers/Product');

class Factory {
  static user() {
    const userRepository = new UserRepository(model.User);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return { userController, userService, userRepository };
  }

  static product() {
    const productRepository = new ProductRepository(model.Product);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);
    return { productController, productService, productRepository };
  }
}

module.exports = Factory;
