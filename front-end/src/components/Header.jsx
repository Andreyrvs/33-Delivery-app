/* eslint-disable react-hooks/exhaustive-deps */
import '../css/Header.css';
import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { changeString } from '../util/changeNumber';

export default function Header({ pageName }) {
  const history = useHistory();
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { name, role } = user;
  const { totalValue, cart, setTotalValue } = useContext(MyContext);

  const [emptyCar, setEmptyCar] = useState(true);
  const [page, setPage] = useState('');

  const cartTotalPrice = cart.reduce((tot, cur) => tot + cur.totalPrice, 0);

  const myOrders = () => {
    if (role === 'customer') {
      history.push('/customer/orders');
    } else if (role === 'seller') {
      history.push('/seller/orders');
    }
  };

  const handleStatusButton = () => {
    if (totalValue === 0) {
      setEmptyCar(true);
    } else {
      setEmptyCar(false);
    }
  };

  useEffect(() => {
    setPage(pageName);
    setTotalValue(cartTotalPrice);
  });

  useEffect(() => {
    handleStatusButton();
  }, [totalValue]);

  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  const checkout = () => {
    history.push('/customer/checkout');
  };

  const products = () => {
    if (role === 'customer') {
      history.push('/customer/products');
    } else if (role === 'seller') {
      history.push('/seller/orders/');
    } else {
      console.log('fazer a rota');
    }
  };

  return (
    <nav className="headerContainer">
      <div className="headerProdutos">
        <button
          className="button-header"
          type="button"
          onClick={ products }
          data-testid="customer_products__element-navbar-link-products"
        >
          { page }
        </button>
      </div>
      <div className="headerPedidos">
        <button
          data-testid="customer_products__element-navbar-link-orders"
          className="button-header"
          type="submit"
          onClick={ myOrders }
        >
          MEUS PEDIDOS
        </button>
      </div>
      <div className="headerCarrinho">
        <button
          data-testid="customer_products__button-cart"
          className="button-header"
          type="button"
          disabled={ emptyCar }
          onClick={ checkout }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            Ver Carrinho:
            { ' ' }
            { changeString(Number(totalValue).toFixed(2))}
          </p>
        </button>
      </div>
      <div className="headerNome">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          Cliente:
          {' '}
          { name }
        </span>
      </div>
      <div className="headerSair">
        <button
          data-testid="customer_products__element-navbar-link-logout"
          className="button-header"
          type="button"
          onClick={ logOut }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
}.isRequired;
