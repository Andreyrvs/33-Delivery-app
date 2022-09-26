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
  const { totalValue } = useContext(MyContext);

  const [emptyCar, setEmptyCar] = useState(true);
  const [page, setPage] = useState('');

  const handleStatusButton = () => {
    if (totalValue === 0) {
      setEmptyCar(true);
    } else {
      setEmptyCar(false);
    }
  };

  useEffect(() => { setPage(pageName); }, []);

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
        <span
          data-testid="customer_products__element-navbar-link-products"
        >
          { page }
        </span>
      </div>
      <div className="headerPedidos">
        <span
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </span>
      </div>
      <div className="headerCarrinho">
        <button
          type="submit"
          data-testid="customer_products__checkout-bottom-value"
        >
          { changeString(Number(totalValue).toFixed(2)) }
        </button>
        <button
          type="button"
          onClick={ checkout }
          disabled={ emptyCar }
          data-testeid="customer_products__checkout-buttom-cart"
        >
          carrinho
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
