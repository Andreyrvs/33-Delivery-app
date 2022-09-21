const LoginRepository = require('./repository/Login');
const user = require('./database/models/user');
const LoginService = require('./services/Login');
const LoginController = require('./controllers/Login');

class Factory {
  static login() {
    const loginRepository = new LoginRepository(user);
    const loginService = new LoginService(loginRepository);
    const loginController = new LoginController(loginService);
    return loginController;
  }
}

module.exports = Factory;