import users from './mockUser';
import product from './mockProdutos';
import { validRegister } from './mockRegister';

const login = 'http://localhost:3001/login';
const register = 'http://localhost:3001/register';
const products = 'http://localhost:3001/customer/products';

const mockFetchSuccess = (url, options) => {
  if (url === login) {
    const findUser = users.find((user) => user.email === JSON.parse(options.body).email);
    return Promise.resolve({
      json: () => Promise.resolve(findUser),
      status: 200,
    });
  }

  if (url === register) {
    return Promise.resolve({
      json: () => Promise.resolve(validRegister),
      status: 201,
    });
  }

  if (url === products) {
    return Promise.resolve({
      json: () => Promise.resolve(product),
    });
  }
};

const mockFetchFailed = (url) => {
  if (url === login) {
    return Promise.resolve({
      json: () => Promise.resolve({ message: 'Usuário não cadastrado' }),
    });
  }
  if (url === register) {
    return Promise.resolve({
      json: () => Promise.resolve({ message: 'Usuário já existe' }),
      status: 409,
    });
  }
};

export default {
  mockFetchSuccess,
  mockFetchFailed,
};
