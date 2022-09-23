import '../css/Header.css';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function Header() {
  const history = useHistory();

  const userString = localStorage.getItem('data');
  const user = JSON.parse(userString);
  const { name } = user;
  const { totalValue } = useContext(MyContext);

  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav className="headerContainer">
      <div className="headerProdutos data">
        <span
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </span>
      </div>
      <div className="headerPedidos">
        <span
          data-testid="customer_products__element-navbar-link-products"
        >
          MEUS PEDIDOS
        </span>
      </div>
      <div className="headerCarrinho">
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          Carrinho: R$
          { Number(totalValue).toFixed(2) }
        </span>
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
