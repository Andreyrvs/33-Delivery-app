import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('teste rota /login', () => {
  it('tem email', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getEmail = screen.getByTestId('common_login__input-email');
    expect(getEmail).toBeInTheDocument();
  });

  it('tem password', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getPassword = screen.getByTestId('common_login__input-password');
    expect(getPassword).toBeInTheDocument();
  });

  it('tem button login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getLogin = screen.getByTestId('common_login__button-login');
    expect(getLogin).toBeInTheDocument();
  });

  it('tem button register', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const register = screen.getByTestId('common_login__button-register');
    expect(register).toBeInTheDocument();
  });

  it('button register tem texto, "Ainda não tenho cadastro"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const buttonCadastro = screen.getByText('Ainda não tenho cadastro');
    expect(buttonCadastro).toBeDefined();
  });

  it('tem button register, redireciona', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getRegister = screen.getByTestId('common_login__button-register');
    userEvent.click(getRegister);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/register');
  });
});
