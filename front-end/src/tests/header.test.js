import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('custome products page', () => {
  it('tem data-testid="customer_products__element-navbar-link-products"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/costumer/products');

    const spanProducts = screen.getByTestId((
      'customer_products__element-navbar-link-products'));

    expect(spanProducts).toBeInTheDocument();
  });
});
