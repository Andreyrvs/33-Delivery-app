import React from 'react';
import { fireEvent } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
// import axios from 'axios';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

// import { fetchPost } from '../services/connectApi';
jest.mock('axios');

describe('teste pagina de registro', () => {
  it('tem data-testid "common_register__input-name"', () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/register');
    debug();
    const inpuName = screen.getByTestId('common_register__input-name');
    expect(inpuName).toBeInTheDocument();
  });

  it('tem data-testid "common_register__input-email"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const getemail = screen.getByTestId('common_register__input-email');
    expect(getemail).toBeInTheDocument();
  });

  it('tem data-testid "common_register__input-password"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const getPassword = screen.getByTestId('common_register__input-password');
    expect(getPassword).toBeInTheDocument();
  });

  it('tem data-testid "common_register__button-register"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const registerButton = screen.getByTestId('common_register__button-register');
    expect(registerButton).toBeInTheDocument();
  });

  it('redireciona button register para /customer/products', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const getRegister = screen.getByTestId('common_register__button-register');
    fireEvent.click(getRegister);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/register');
  });

  it('tem cadastro', () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/register');
    debug();
    const button = screen.getByRole('button', { name: /cadastrar/i });
    expect(button).toBeInTheDocument();
  });
});
