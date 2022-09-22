const md5 = require('md5');
const { handleThrowError, generateToken } = require('../helpers');
const BaseService = require('./Base');

class LoginService extends BaseService {
  async login(login) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (login.password.length < 6) handleThrowError('Password must be at least 6 characters', 401);
    if (!emailRegex.test(login.email)) handleThrowError('Invalid email address', 401);
    const user = await this.repository.getOneUser(login.email);
    if (!user) handleThrowError('User not found', 404);

    const isValid = user.password === md5(login.password);
    if (!isValid) handleThrowError('Incorrect email or password', 401);
    const { passwordm, ...userInfo } = user.get();
    const token = generateToken({ ...userInfo });
    return { token };
  }
}

module.exports = LoginService;