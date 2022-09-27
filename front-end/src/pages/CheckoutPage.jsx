import { useContext, useEffect } from 'react';
import DeliveryDetails from '../components/DeliveryDetails';
import Header from '../components/Header';
import Modal from '../components/Modal';
import MyContext from '../context/MyContext';
import '../css/Checkout.css';

export default function CheckoutPage() {
  const { cart, openModal, setOpenModal } = useContext(MyContext);

  useEffect(() => {
  }, [cart]);

  return (
    <div>
      { openModal && (
        <Modal closeModal={ setOpenModal } />
      )}
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
      <DeliveryDetails />
    </div>
  );
}
