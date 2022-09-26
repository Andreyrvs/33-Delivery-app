import { useState } from 'react';
import '../css/DeliveryDetails.css';

export default function DeliveryDetails() {
  const [seller, setSeller] = useState('');
  const [adress, setAdress] = useState('');
  const [numberAdress, setNumber] = useState('');

  const handleForm = ({ target }) => {
    if (target.name === 'nameSeller') setSeller(target.value);
    if (target.name === 'adress') setAdress(target.value);
    if (target.name === 'numberAdress') setNumber(target.value);
  };

  const sellers = ['joao', 'maria', 'josefina'];

  const cleanForm = () => {
    setSeller('');
    setAdress('');
    setNumber('');
  };

  const sendOrder = (event) => {
    event.preventDefault();
    alert('Enviado');
    cleanForm();
  };

  return (
    <section className="deliveryContainer">
      <div>
        <h2>Detalhes e Endereço para Entrega</h2>
      </div>
      <div className="formDeliveryContainer">
        <form className="deliveryFormAdress">
          <label htmlFor="nameSeller" className="inputAdressSelect">
            P. Vendedora responsável:
            <select
              id="nameSeller"
              type="text"
              data-testid="customer_checkout__select-seller"
              name="nameSeller"
              value={ seller }
              onChange={ handleForm }
            >
              {
                sellers.map((item) => (
                  <option
                    key={ item }
                    value={ item }
                  >
                    {item}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="adress" className="inputAdressAdress">
            Endereço:
            <input
              id="adress"
              type="text"
              data-testid="customer_checkout__input-address"
              placeholder="Endereço"
              name="adress"
              value={ adress }
              onChange={ handleForm }
            />
          </label>

          <label htmlFor="numberAdress" className="inputAdressNumber">
            Número:
            <input
              id="numberAdress"
              type="number"
              data-testid="customer_checkout__input-address-number"
              placeholder="222"
              name="numberAdress"
              value={ numberAdress }
              onChange={ handleForm }
            />
          </label>

        </form>
        <div className="deliveryButton">
          <button
            data-testid="customer_checkout__button-submit-order"
            type="submit"
            onClick={ sendOrder }
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </section>
  );
}
