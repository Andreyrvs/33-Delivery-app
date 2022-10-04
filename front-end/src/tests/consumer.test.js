import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mockFetch';
import mockLogin from './mockLogin';

const path = '/customer/products';

describe('Testes da página do Consumidor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  const inputEmailLogin = 'common_login__input-email';
  const inputPasswordLogin = 'common_login__input-password';
  const buttonLogin = 'common_login__button-login';

  const navbarLogout = 'customer_products__element-navbar-link-logout';

  it('direciona rota login para customer products ', async () => {
    global.fetch = jest.fn(mockFetch.mockFetchSuccess);
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(inputEmailLogin);
    const inputPassword = screen.getByTestId(inputPasswordLogin);
    const button = screen.getByTestId(buttonLogin);

    userEvent.type(inputEmail, mockLogin.validLoginCustomer.email);
    userEvent.type(inputPassword, mockLogin.validLoginCustomer.password);
    userEvent.click(button);

    const find = await screen.findByTestId('customer_products__img-card-bg-image-2');
    expect(find).toBeInTheDocument();

    expect(history.location.pathname).toBe(path);
  });

  it('Ao clicar no botão sair redireciona para rota login', async () => {
    global.fetch = jest.fn(mockFetch.mockFetchSuccess);
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(inputEmailLogin);
    const inputPassword = screen.getByTestId(inputPasswordLogin);
    const button = screen.getByTestId(buttonLogin);

    userEvent.type(inputEmail, mockLogin.validLoginCustomer.email);
    userEvent.type(inputPassword, mockLogin.validLoginCustomer.password);
    fireEvent.click(button);

    const find = await screen.findByTestId('customer_products__img-card-bg-image-2');
    expect(find).toBeInTheDocument();
    expect(history.location.pathname).toBe(path);

    const logout = screen.getByTestId(navbarLogout);
    fireEvent.click(logout);

    const find2 = await screen.findByTestId('common_login__input-email');
    expect(find2).toBeInTheDocument();

    expect(history.location.pathname).toBe('/login');
  });
});
