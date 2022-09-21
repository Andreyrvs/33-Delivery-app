class UserRepository {
  constructor(_user) {
    this.user = _user;
  }
  
  async login(email) {
    const result = await this.user.findOne({ where: { email } });
    return result;
  }

  // async loginValidate(email) {
  //   const user = await user.findOne({ where: { email } });
  //   return user?.role;
  // }
}

module.exports = UserRepository;