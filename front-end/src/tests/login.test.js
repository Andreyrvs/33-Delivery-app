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
    expect(getEmail.type).toBe('email');
  });

  it('tem password', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getPassword = screen.getByTestId('common_login__input-password');
    expect(getPassword).toBeInTheDocument();
    expect(getPassword.type).toBe('password');
  });

  it('tem button login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getLogin = screen.getByTestId('common_login__button-login');
    const button = screen.getAllByRole('button');
    expect(getLogin).toBeInTheDocument();
    expect(button).toHaveLength(2);
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
    const click1 = jest.fn();
    userEvent.click(screen.getByText('Ainda não tenho cadastro'));
    expect(click1).toHaveBeenCalledTimes(0);
  });

  it('tem button register, redireciona', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/login');
    const getRegister = screen.getByTestId('common_login__button-register');
    userEvent.click(getRegister);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/register');
  });

  it('verifica email e password', () => {
    renderWithRouter(<App />);
    const validEmail = 'email@example.com';
    const validPassword = '1234567';

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const button = screen.getByRole('button', { name: /login/i });

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    expect(button).toBeEnabled();
  });
});
