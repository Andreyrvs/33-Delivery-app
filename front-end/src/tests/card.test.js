import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/dom';
// import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
// import * as xablau from '../services/connectApi';
// import { fetchPost } from '../services/connectApi';
// import Card from '../components/Card';
import App from '../App';

const customerPproducts = '/customer/products';
const three = 3;
describe('teste pagina de registro', () => {
  window.localStorage.setItem('user', JSON.stringify({ name: 'xablau' }));

  it('tem data-testid "customer_products__element-card-price-{id}"', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push(customerPproducts);
    debug();
    await waitFor(() => {
      expect(screen.getByTestId(
        'customer_products__element-card-price-1',
      )).toBeInTheDocument();
    });
  });

  it('tem data-testid "customer_products__img-card-bg-image-{id}"', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push(customerPproducts);
    debug();
    await waitFor(() => {
      const spanImg = screen.getByTestId(
        'customer_products__img-card-bg-image-1',
      );
      expect(spanImg).toBeInTheDocument();
    });
  });

  it('tem data-testid "customer_products__element-card-title-{id}"', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push(customerPproducts);
    debug();
    await waitFor(() => {
      const spanTitle = screen.getByTestId(
        'customer_products__element-card-title-1',
      );

      expect(spanTitle).toBeInTheDocument();
    });
  });

  it('tem data-testid "customer_products__button-card-rm-item-{id}"', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push(customerPproducts);
    debug();
    await waitFor(() => {
      const spanitem = screen.getByTestId(
        'customer_products__button-card-rm-item-1',
      );
      fireEvent.click(spanitem);

      expect(spanitem).toBeInTheDocument();
    });
  });

  it('tem data-testid "customer_products__input-card-quantity-{id}"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(customerPproducts);
    const input = await screen.findByTestId('customer_products__input-card-quantity-1');
    fireEvent.change(input, { target: { value: '1' } });

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('1');
  });

  it('tem data-testid "customer_products__button-card-add-item-{id}"', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push(customerPproducts);
    debug();
    await waitFor(() => {
      const spanquantity = screen.getByTestId(
        'customer_products__button-card-add-item-1',
      );
      fireEvent.click(spanquantity);
      expect(spanquantity).toBeInTheDocument();
    });
  });

  it('tem button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(customerPproducts);
    const button = screen.getAllByRole('button');
    await waitFor(() => {
      const spanquantity = screen.getByTestId(
        'customer_products__button-card-add-item-1',
      );

      expect(spanquantity).toBeInTheDocument();
    });
    expect(button).toHaveLength(three);
  });
});
