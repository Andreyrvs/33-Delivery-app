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
  const { name } = user;
  const { totalValue, cart, setTotalValue } = useContext(MyContext);

  const [emptyCar, setEmptyCar] = useState(true);
  const [page, setPage] = useState('');

  const cartTotalPrice = cart.reduce((tot, cur) => tot + cur.totalPrice, 0);

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

  return (
    <nav className="headerContainer">
      <div className="headerProdutos data">
        <button
          data-testid="customer_products__element-navbar-link-products"
          className="button-header"
          type="submit"
          onClick={ () => history.push('/customer/products') }
        >
          {page}
        </button>
      </div>
      <div className="headerPedidos">
        <button
          data-testid="customer_products__element-navbar-link-products"
          className="button-header"
          type="submit"
          onClick={ () => history.push('/customer/orders') }
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
            { changeString(Number(totalValue).toFixed(2)) }
          </p>
        </button>
      </div>
      <div className="headerNome">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
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
