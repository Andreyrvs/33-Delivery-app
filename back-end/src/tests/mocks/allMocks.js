const mockLoginIncorrect = {
  name: "Admin",
  email: "adm@deliveryapp.com",
  password: "senhaerrada",
};

const mockLoginCorrect = {
  name: "Admin",
  email: "adm@deliveryapp.com",
  password: "--adm2@22!!--",
};

const mockLogin = {
  name: "Admin",
  email: "adm@deliveryapp.com",
  password: "a4c86edecc5aee06eff8fdeda69e0d04",
  role: "admin",
};

const newUser = {
  name: 'Novo usuário',
  email: 'user@deliveryapp.com',
  password: 'user1234',
};

module.exports = {mockLogin, mockLoginCorrect, mockLoginIncorrect, newUser};

