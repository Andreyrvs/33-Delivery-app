import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [userLogin, setUserLogin] = useState({});
  const [sale, setSale] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [msgModal, setMsgModal] = useState('');
  const [orderSelected, setOrderSelected] = useState();

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    totalValue,
    setTotalValue,
    sale,
    setSale,
    openModal,
    setOpenModal,
    userLogin,
    setUserLogin,
    msgModal,
    setMsgModal,
    orderSelected,
    setOrderSelected,
  }), [cart, totalValue, sale, openModal, userLogin, msgModal, orderSelected]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
