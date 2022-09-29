const md5 = require('md5');
const { generateToken } = require('../helpers');
const BaseService = require('./Base');
const UserValidations = require('../validations/User');

class UserService extends BaseService {
  async login(login) {
    UserValidations.reqLogin(login);
    const user = await this.repository.getOneUser(login.email);
    UserValidations.checkLogin(login, user);
    const { password, id, ...userInfo } = user.get();
    const token = generateToken({ userId: id, ...userInfo });
    return { token, id, ...userInfo };
  }

  async create(body) {
    UserValidations.reqUser(body);
    const encryptedPsw = md5(body.password);
    const data = await this.repository.create({ ...body, password: encryptedPsw });
    UserValidations.checkIfCreated(data);
    return data.user;
  }
}

module.exports = UserService;
