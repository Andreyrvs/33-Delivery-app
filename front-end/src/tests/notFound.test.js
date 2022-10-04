import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('teste rota notfound', () => {
  it('verifica se renderiza notfound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src');
    expect(history.location.pathname).toBe('/notFound');
  });
});
