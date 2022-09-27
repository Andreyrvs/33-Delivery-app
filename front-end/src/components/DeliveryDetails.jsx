import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchPost } from '../services/connectApi';
import '../css/DeliveryDetails.css';

export default function DeliveryDetails() {
  const history = useHistory();
  const [sellerForm, setSellerForm] = useState('');
  const [adress, setAdress] = useState('');
  const [numberAdress, setNumber] = useState('');
  const URL = 'http://localhost:3001/customer/checkout';
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { id, token } = user;
  const { cart, totalValue, setSale, setOpenModal } = useContext(MyContext);
  const CREATESUCCESS = 201;
  const TIMER = 1000;

  const PAYLOAD = {
    userId: id,
    sellerId: 2, // get push sellers
    totalPrice: Number(parseFloat(totalValue).toFixed(2)),
    deliveryAddress: adress,
    deliveryNumber: numberAdress,
    token,
    products: cart.map((item) => ({
      productId: item.id,
      quantity: item.qtd,
    })),
  };

  const handleForm = ({ target }) => {
    if (target.name === 'nameSeller') setSellerForm(target.value);
    if (target.name === 'adress') setAdress(target.value);
    if (target.name === 'numberAdress') setNumber(target.value);
  };

  const sellers = ['joao', 'maria', 'josefina'];

  const cleanForm = () => {
    setSellerForm('');
    setAdress('');
    setNumber('');
  };

  const sendOrder = async (event) => {
    event.preventDefault();
    setOpenModal(true);
    cleanForm();

    const result = await fetchPost(URL, PAYLOAD);
    // console.log('t', PAYLOAD.token);
    if (result.status === CREATESUCCESS) {
      setSale([result.data]);
      setTimeout(() => {
        history.push(`/customer/orders/${result.data.id}`);
      }, TIMER);
    }
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
              value={ sellerForm }
              onChange={ handleForm }
            >
              { sellers && (
                sellers.map((item) => (
                  <option
                    key={ item.email }
                    value={ item.name }
                  >
                    {item}
                  </option>
                ))
              )}
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
