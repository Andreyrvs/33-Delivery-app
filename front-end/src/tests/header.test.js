import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const customerPproducts = '/customer/products';

describe('custome products page', () => {
  window.localStorage.setItem('data', JSON.stringify({ name: 'xablau' }));
  it('tem data-testid="customer_products__element-navbar-link-products"', () => {
    const { history, debug } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    debug();
    const spanProducts = screen
      .getAllByTestId('customer_products__element-navbar-link-products');
    console.log('to aqui', spanProducts);
    expect(spanProducts[0]).toBeInTheDocument();
  });

  it('tem data-testid="customer_products__checkout-bottom-value"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    const spanValue = screen
      .getByTestId('customer_products__checkout-bottom-value');

    expect(spanValue).toBeInTheDocument();
  });

  it('tem data-testid="customer_products__element-navbar-user-full-name"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    const spanName = screen
      .getByTestId('customer_products__element-navbar-user-full-name');
    expect(spanName).toBeInTheDocument();
  });

  it('tem data-testid="customer_products__element-navbar-link-logout"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    const spanLogout = screen
      .getByTestId('customer_products__element-navbar-link-logout');

    expect(spanLogout).toBeInTheDocument();
  });

  it('tem button name', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    const spanLogout = screen
      .getByRole('button', { name: /Sair/i });

    expect(spanLogout).toBeInTheDocument();
  });
});
