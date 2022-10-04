import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import mockFetch from './mockFetch';
import { validRegister } from './mockRegister';

describe('Testes /Register', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const dataTestButtonRegister = 'common_login__button-register';
  const dataTestInputNameRegister = 'common_register__input-name';
  const dataTestInputEmailRegister = 'common_register__input-email';
  const dataTestInputPasswordRegister = 'common_register__input-password';
  const dataTestButtonCreateRegister = 'common_register__button-register';
  const dataTestInvalidRegister = 'common_register__element-invalid_register';

  it('Se já existe cadastro aparece mesagem de erro', async () => {
    global.fetch = jest.fn(mockFetch.mockFetchFailed);
    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegister);
    userEvent.click(buttonRegisterLogin);

    expect(history.location.pathname).toBe('/register');

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    userEvent.type(inputName, validRegister.name);
    userEvent.type(inputEmail, validRegister.email);
    userEvent.type(inputPassword, validRegister.password);

    expect(buttonCreateRegister).toBeEnabled();
    userEvent.click(buttonCreateRegister);

    const findEnable = await screen.findByTestId(dataTestInvalidRegister);
    expect(findEnable).toBeInTheDocument();
  });
});
