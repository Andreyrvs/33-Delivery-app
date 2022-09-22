const md5 = require('md5');
const { handleThrowError } = require('../helpers/errorHandler');
const BaseService = require('./Base');

class LoginService extends BaseService {
  async login(login) {
    const user = await this.repository.getOneUser(login.email);

    const isValid = user.password === md5(login.password);
    if (!isValid) handleThrowError('Incorrect email or password', 401);
    return { token: 'token' };
  }
}

module.exports = LoginService;