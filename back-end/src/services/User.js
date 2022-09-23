const md5 = require('md5');
const { handleThrowError, generateToken, joi } = require('../helpers');
const BaseService = require('./Base');

class LoginService extends BaseService {
  async login(login) {
    joi.validateLoginJoi(login, 401);
    const user = await this.repository.getOneUser(login.email);
    if (!user) handleThrowError('User not found', 404);
    const isValid = user.password === md5(login.password);
    if (!isValid) handleThrowError('Incorrect email or password', 401);

    const { passwordm, ...userInfo } = user.get();
    const token = generateToken({ ...userInfo });
    return { token };
  }

  async create(body) {
    const encryptedPsw = md5(body.password);
    const data = await this.repository.create({ ...body, password: encryptedPsw });
    if (!data.created) handleThrowError('User already exists', 409);
    return data.user;
  }
}

module.exports = LoginService;