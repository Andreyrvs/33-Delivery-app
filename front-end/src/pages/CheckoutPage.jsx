import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import '../css/Checkout.css';

export default function CheckoutPage() {
  const { cart, totalValue } = useContext(MyContext);
  // const [newCart, setNewCart] = useState([cart]);

  useEffect(() => {
  }, [cart]);
  return (
    <div>
      <Header pageName="Checkout" />
      <div className="checkoutContainer">
        { cart && (
          cart.map((item) => (
            <div key={ item.id } className="itemContainer">
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.qtd}</p>
              <p>{item.price}</p>
            </div>
          ))
        ) }
      </div>
      <Link to="/customer/products">
        <p>Voltar</p>
      </Link>
      <p>{ totalValue }</p>
    </div>
  );
}
