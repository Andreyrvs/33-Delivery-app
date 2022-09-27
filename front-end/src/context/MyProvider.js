import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [sale, setSale] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    totalValue,
    setTotalValue,
    sale,
    setSale,
    openModal,
    setOpenModal,
  }), [cart, totalValue, sale, openModal]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
