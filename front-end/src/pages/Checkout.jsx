import { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import FinalizeCard from '../components/FinalizeCard';
import DeliveryDetails from '../components/DeliveryDetails';
import Header from '../components/Header';
import '../css/Checkout.css';

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
