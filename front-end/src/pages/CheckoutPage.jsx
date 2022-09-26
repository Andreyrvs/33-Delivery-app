import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeliveryDetails from '../components/DeliveryDetails';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import '../css/Checkout.css';

export default function CheckoutPage() {
  const { cart } = useContext(MyContext);
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
      <DeliveryDetails />
    </div>
  );
}
