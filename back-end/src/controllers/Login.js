class LoginController {
  constructor(user) {
    this.user = user;
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    const token = await this.user.login(req.body);
    return res.status(200).json(token);
  }

  // loginValidate = async (req, res) => {
  //   const role = await this.user.loginValidate(req.body.userAuth.email);
  //   return res.status(200).json({ role });
  // };
}

module.exports = LoginController;