import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockLogin from './mockLogin';
import mockFetch from './mockFetch';

describe('Testes da página de Login', () => {
  const dataTestInputEmail = 'common_login__input-email';
  const dataTestInputPassword = 'common_login__input-password';
  const dataTestButtonLogin = 'common_login__button-login';
  const dataTestButtonRegister = 'common_login__button-register';

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Renderizar na rota /login', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/login');
  });

  it('tem data-test-"common_login__input-email', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);

    expect(inputEmail).toBeInTheDocument();
  });

  it('Tem data-test-"common_login__input-password"', () => {
    renderWithRouter(<App />);

    const inputPassword = screen.getByTestId(dataTestInputPassword);

    expect(inputPassword).toBeInTheDocument();
  });

  it('Tem data-test-"common_login__button-login"', () => {
    renderWithRouter(<App />);

    const buttonLogin = screen.getByTestId(dataTestButtonLogin);

    expect(buttonLogin).toBeInTheDocument();
  });

  it('Tem data-test-"common_login__button-register"', () => {
    renderWithRouter(<App />);

    const buttonRegister = screen.getByTestId(dataTestButtonRegister);

    expect(buttonRegister).toBeInTheDocument();
  });

  it('Se o formato de email for inválido botão de login devera esta desabilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    const buttonLogin = screen.getByTestId(dataTestButtonLogin);

    userEvent.type(inputEmail, mockLogin.loginInvalid.email);

    expect(buttonLogin).toBeDisabled();
  });

  it('Se o formato de password inválido botão de login devera esta desabilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    const buttonLogin = screen.getByTestId(dataTestButtonLogin);

    userEvent.type(inputEmail, mockLogin.loginInvalid.password);

    expect(buttonLogin).toBeDisabled();
  });

  it(`Redireciona o (administrador) para tela de gerenciamento se as
  credenciais forem corretamente preenchidas`, async () => {
    global.fetch = jest.fn(mockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    const inputPassword = screen.getByTestId(dataTestInputPassword);
    const buttonLogin = screen.getByTestId(dataTestButtonLogin);

    userEvent.type(inputEmail, mockLogin.validLoginAdmin.email);
    userEvent.type(inputPassword, mockLogin.validLoginAdmin.password);
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/login');
  });
});
