import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
// import { fetchPost } from '../services/connectApi';
import App from '../App';

const customerPproducts = '/customer/products';

describe('teste pagina de registro', () => {
  window.localStorage.setItem('data', JSON.stringify({ name: 'xablau' }));
  it('tem data-testid "customer_products__element-card-price-{id}"', () => {
    const { history, debug } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    debug();
    const spanId = screen
      .getByTestId('customer_products__element-card-price-6');

    expect(spanId).toBeInTheDocument();
  });

  it('tem data-testid "customer_products__img-card-bg-image-{id}"', () => {
    const { history, debug } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    debug();
    const spanImg = screen
      .getByTestId('customer_products__img-card-bg-image-6');

    expect(spanImg).toBeInTheDocument();
  });

  it('tem data-testid "customer_products__element-card-title-{id}"', () => {
    const { history, debug } = renderWithRouter(<App />);
    act(() => {
      history.push(customerPproducts);
    });
    debug();
    const spanTitle = screen
      .getByTestId('customer_products__element-card-title-6');

    expect(spanTitle).toBeInTheDocument();
  });
});
