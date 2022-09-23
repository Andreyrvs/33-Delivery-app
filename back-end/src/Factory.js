const model = require('./database/models');
const UserRepository = require('./repository/User');
const UserService = require('./services/User');
const UserController = require('./controllers/User');

class Factory {
  static user() {
    const userRepository = new UserRepository(model.User);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return { userController, userService, userRepository };
  }
}

module.exports = Factory;
