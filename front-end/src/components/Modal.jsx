import React from 'react';
import '../css/Modal.css';
import PropTypes from 'prop-types';

function Modal({ closeModal, msgModal }) {
  const closeM = () => {
    closeModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            type="button"
            onClick={ closeM }
          >
            X
          </button>
        </div>
        {/*
        <div className="title">
          <h1> </h1>
        </div>
        */}
        <div className="body">
          <p>{msgModal}</p>
        </div>
        {/*
        <div className="footer">
          <button
            type="button"
            className="cancelBtn"
            onClick={ closeM }
          >
            Cancelar
          </button>
          <button
            className="continueBtn"
            type="button"
          >
            Confirmar
          </button>
        </div>
        */}
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.boolean,
}.isRequired;

export default Modal;
