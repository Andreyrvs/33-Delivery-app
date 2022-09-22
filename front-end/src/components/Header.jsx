import '../css/Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const userName = localStorage.getItem('user');
  return (
    <nav className="headerContainer">
      <div className="headerProdutos data">
        <spam
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </spam>
      </div>
      <div className="headerPedidos">
        <spam
          data-testid="customer_products__element-navbar-link-products"
        >
          MEUS PEDIDOS
        </spam>
      </div>
      <div className="headerNome">
        <spam
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </spam>
      </div>
      <div className="headerSair">
        <Link to="/login">
          <spam
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </spam>
        </Link>
      </div>
    </nav>
  );
}
