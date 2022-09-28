import { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import FinalizeCard from '../components/FinalizeCard';
import DeliveryDetails from '../components/DeliveryDetails';
import Header from '../components/Header';
import '../css/Checkout.css';
import Modal from '../components/Modal';

export default function CheckoutPage() {
  const { cart, openModal, setOpenModal, msgModal } = useContext(MyContext);

  useEffect(() => {
  }, [cart]);
  return (
    <div>
      { openModal && (
        <Modal closeModal={ setOpenModal } msgModal={ msgModal } />
      )}
      <Header pageName="Produtos" />
      <section className="finalize-card">
        <FinalizeCard />
      </section>
      <DeliveryDetails />
    </div>
  );
}
