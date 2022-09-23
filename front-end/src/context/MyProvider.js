import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
  }, [cart]);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    totalValue,
    setTotalValue,
  }), [cart, totalValue]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
