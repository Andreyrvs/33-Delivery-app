import { useContext, useEffect } from 'react';
import FinalizeCard from '../components/FinalizeCard';
import DeliveryDetails from '../components/DeliveryDetails';
import Header from '../components/Header';
import '../css/Checkout.css';
import MyContext from '../context/MyContext';

export default function CheckoutPage() {
  const { cart } = useContext(MyContext);

  useEffect(() => {
  }, [cart]);
  return (
    <div>
      <Header pageName="PRODUTOS" />
      <section className="finalize-card">
        <FinalizeCard />
      </section>
      <DeliveryDetails />
    </div>
  );
}
