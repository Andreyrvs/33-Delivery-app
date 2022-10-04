import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mockFetch';
import mockLogin from './mockLogin';

const path = '/customer/products';

describe('Testes da página do Consumidor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  const inputEmailLogin = 'common_login__input-email';
  const inputPasswordLogin = 'common_login__input-password';
  const buttonLogin = 'common_login__button-login';

  // const navbarLinkProducts = 'customer_products__element-navbar-link-products';

  // const navbarLinkOrders = 'customer_products__element-navbar-link-orders';

  // const navbarFullName = 'customer_products__element-navbar-user-full-name';
  // const cardPriceId = (id) => `customer_products__element-card-price-${id}`;

  // const cardBgImage = (id) => `customer_products__img-card-bg-image-${id}`;

  // const cardTitle = (id) => `customer_products__element-card-title-${id}`;

  const navbarLogout = 'customer_products__element-navbar-link-logout';

  it('direciona rota login para customer products ', async () => {
    global.fetch = jest.fn(mockFetch.mockFetchSuccess);
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(inputEmailLogin);
    const inputPassword = screen.getByTestId(inputPasswordLogin);
    const button = screen.getByTestId(buttonLogin);

    userEvent.type(inputEmail, mockLogin.validLoginCustomer.email);
    userEvent.type(inputPassword, mockLogin.validLoginCustomer.password);
    userEvent.click(button);

    const find = await screen.findByTestId('customer_products__img-card-bg-image-2');
    expect(find).toBeInTheDocument();

    expect(history.location.pathname).toBe(path);
  });

  it('Ao clicar no botão sair redireciona para rota login', async () => {
    global.fetch = jest.fn(mockFetch.mockFetchSuccess);
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(inputEmailLogin);
    const inputPassword = screen.getByTestId(inputPasswordLogin);
    const button = screen.getByTestId(buttonLogin);

    userEvent.type(inputEmail, mockLogin.validLoginCustomer.email);
    userEvent.type(inputPassword, mockLogin.validLoginCustomer.password);
    fireEvent.click(button);
    console.log('paoapaoapaoapoa', button);

    const find = await screen.findByTestId('customer_products__img-card-bg-image-2');
    expect(find).toBeInTheDocument();
    expect(history.location.pathname).toBe(path);

    const logout = screen.getByTestId(navbarLogout);
    fireEvent.click(logout);

    const find2 = await screen.findByTestId('common_login__input-email');
    expect(find2).toBeInTheDocument();

    expect(history.location.pathname).toBe('/login');
  });
});

// describe('teste pagina de registro', () => {
//   window.localStorage.setItem('user', JSON.stringify({ name: 'xablau' }));

//   it('tem data-testid "customer_products__element-card-price-{id}"', async () => {
//     const { history, debug } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     debug();
//     await waitFor(() => {
//       expect(screen.getByTestId(
//         'customer_products__element-card-price-1',
//       )).toBeInTheDocument();
//     });
//   });

//   it('tem data-testid "customer_products__img-card-bg-image-{id}"', async () => {
//     const { history, debug } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     debug();
//     await waitFor(() => {
//       const spanImg = screen.getByTestId(
//         'customer_products__img-card-bg-image-1',
//       );
//       expect(spanImg).toBeInTheDocument();
//     });
//   });

//   it('tem data-testid "customer_products__element-card-title-{id}"', async () => {
//     const { history, debug } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     debug();
//     await waitFor(() => {
//       const spanTitle = screen.getByTestId(
//         'customer_products__element-card-title-1',
//       );

//       expect(spanTitle).toBeInTheDocument();
//     });
//   });

//   it('tem data-testid "customer_products__button-card-rm-item-{id}"', async () => {
//     const { history, debug } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     debug();
//     await waitFor(() => {
//       const spanitem = screen.getByTestId(
//         'customer_products__button-card-rm-item-1',
//       );
//       fireEvent.click(spanitem);

//       expect(spanitem).toBeInTheDocument();
//     });
//   });

//   it('tem data-testid "customer_products__input-card-quantity-{id}"', async () => {
//     const { history } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     const input = await screen.findByTestId('customer_products__input-card-quantity-1');
//     fireEvent.change(input, { target: { value: '1' } });

//     expect(input).toBeInTheDocument();
//     expect(input.value).toBe('1');
//   });

//   it('tem data-testid "customer_products__button-card-add-item-{id}"', async () => {
//     const { history, debug } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     debug();
//     await waitFor(() => {
//       const spanquantity = screen.getByTestId(
//         'customer_products__button-card-add-item-1',
//       );
//       fireEvent.click(spanquantity);
//       expect(spanquantity).toBeInTheDocument();
//     });
//   });

//   it('tem button', async () => {
//     const { history } = renderWithRouter(<App />);
//     history.push(customerPproducts);
//     const button = screen.getAllByRole('button');
//     await waitFor(() => {
//       const spanquantity = screen.getByTestId(
//         'customer_products__button-card-add-item-1',
//       );

//       expect(spanquantity).toBeInTheDocument();
//     });
//     expect(button).toHaveLength(three);
//   });
// });
