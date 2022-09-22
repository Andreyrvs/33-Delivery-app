import '../css/Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const userName = localStorage.getItem('user');
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
      <div className="headerNome">
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </span>
      </div>
      <div className="headerSair">
        <Link to="/login">
          <span
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </span>
        </Link>
      </div>
    </nav>
  );
}
