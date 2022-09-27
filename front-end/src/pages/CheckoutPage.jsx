import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FinalizeCard from '../components/FinalizeCard';
import DeliveryDetails from '../components/DeliveryDetails';
import Header from '../components/Header';
import '../css/Checkout.css';
import MyContext from '../context/MyContext';

export default function CheckoutPage() {
  const { cart } = useContext(MyContext);
  // const [newCart, setNewCart] = useState([cart]);

  useEffect(() => {
  }, [cart]);
  return (
    <div>
      <Header pageName="Checkout" />
      <section className="finalize-card">
        <FinalizeCard />
      </section>

      <Link to="/customer/products">
        <p>Voltar</p>
      </Link>
      <DeliveryDetails />
    </div>
  );
}
