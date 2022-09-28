/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import OrderDetails from '../components/OrderDetails';

export default function OrderDetailsPage() {
  const { setOpenModal } = useContext(MyContext);

  useEffect(() => {
    setOpenModal(false);
  }, []);

  return (
    <section>
      <Header pageName="PRODUTOS" />
      <OrderDetails />
    </section>
  );
}
