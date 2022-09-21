const md5 = require('md5');
const { HandleThrowError } = require('../helpers/errorHandler');

class LoginService {
  constructor(repository) {
    this.repository = repository;
  }

  async login(login) {
    const user = await this.repository.login(login.email);

    const isValid = user.password === md5(login.password);
    if (!isValid) HandleThrowError('Incorrect email or password', 401);
    // const token = jwtGenerator({
    //   email: user.email,
    //   username: user.username,
    //   role: user.role,
    // });
    return { token: 'token' };
  }

  // async loginValidate(email) {
  //   const role = await this.user.loginValidate(email);
  //   if (!role) HandleThrowError('The user do not exist', 401);
  //   return role;
  // }
}

module.exports = LoginService;