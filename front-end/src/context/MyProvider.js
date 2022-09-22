/*
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [nameUser, setNameUser] = useState('');

  const contextValue = {
    nameUser,
    setNameUser,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
*/
