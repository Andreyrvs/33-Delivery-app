const mockLoginIncorrect = {
  "name": "Admin",
  "email": "adm@deliveryapp.com",
  "password": "senhaerrada",
};

const mockLoginCorrect = {
  "name": "Admin",
  "email": "adm@deliveryapp.com",
  "password": "--adm2@22!!--",
};

const mockLogin = {
  "name": "Admin",
  "email": "adm@deliveryapp.com",
  "password": "a4c86edecc5aee06eff8fdeda69e0d04",
  "role": "admin",
};

const newUser = {
  "name": 'New usuário',
  "email": 'user@deliveryapp.com',
  "role": "customer",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9tZSBEYSBQZXNzb2EgVXN1w6FyaWEiLCJlbWFpbCI6ImVtYWlsQGRvbWluaW8uY29tIiwicm9sZSI6ImN1c3RvbWVyIn0.s5cmiyY16yViCXkHuzWekxkMeYBi75eT8uJnSbfadNE"
};

const newUserWhithId = {
  id: 1,
  name: 'New usuário',
  email: 'user@deliveryapp.com',
  password: "a4c86edecc5aee06eff8fdeda69e0d04",
  role: 'customer',
};

module.exports = {mockLogin, mockLoginCorrect, mockLoginIncorrect, newUser, newUserWhithId};

