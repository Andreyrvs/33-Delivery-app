const model = require('./database/models');
const LoginRepository = require('./repository/User');
const LoginService = require('./services/User');
const LoginController = require('./controllers/User');

class Factory {
  static user() {
    const loginRepository = new LoginRepository(model.User);
    const loginService = new LoginService(loginRepository);
    const loginController = new LoginController(loginService);
    return loginController;
  }
}

module.exports = Factory;
