const md5 = require('md5');
const { handleThrowError, generateToken, joi, httpStatusCode } = require('../helpers');
const BaseService = require('./Base');

class UserService extends BaseService {
  async login(login) {
    joi.validateLoginJoi(login, httpStatusCode.UNAUTHORIZED);
    const user = await this.repository.getOneUser(login.email);
    if (!user) handleThrowError('User not found', httpStatusCode.NOT_FOUND);
    const isValid = user.password === md5(login.password);
    if (!isValid) handleThrowError('Incorrect email or password', httpStatusCode.UNAUTHORIZED);

    const { password, ...userInfo } = user.get();
    const token = generateToken({ ...userInfo });
    return { token, ...userInfo };
  }

  async create(body) {
    const encryptedPsw = md5(body.password);
    const data = await this.repository.create({ ...body, password: encryptedPsw });
    if (!data.created) handleThrowError('User already exists', httpStatusCode.CONFLICT);
    return data.user;
  }
}

module.exports = UserService;
