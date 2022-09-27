import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchPost, fetchAllUsers } from '../services/connectApi';
import '../css/DeliveryDetails.css';

export default function DeliveryDetails() {
  const history = useHistory();
  const [seller, setSeller] = useState('');
  const [adress, setAdress] = useState('');
  const [numberAdress, setNumber] = useState('');
  const [users, setUsers] = useState([]);
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
    if (target.name === 'nameSeller') setSeller(target.value);
    if (target.name === 'adress') setAdress(target.value);
    if (target.name === 'numberAdress') setNumber(target.value);
  };

  const handleSellers = async () => {
    const result = await fetchAllUsers();
    const usersSeller = result.filter((item) => item.role === 'seller');
    setUsers(usersSeller);
    return usersSeller;
  };

  const cleanForm = () => {
    setSeller('');
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

  useEffect(() => {
    if (users) {
      handleSellers();
    }
  }, [users]);
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
              data-testid="customer_checkout__select-seller"
              id="nameSeller"
              type="text"
              name="nameSeller"
              value={ seller }
              onChange={ handleForm }
            >
              {
                users.map((item) => (
                  <option
                    key={ item.id }
                    value={ item.id }
                  >
                    {item.name}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="adress" className="inputAdressAdress">
            Endereço:
            <input
              data-testid="customer_checkout__input-address"
              id="adress"
              type="text"
              placeholder="Endereço"
              name="adress"
              value={ adress }
              onChange={ handleForm }
            />
          </label>

          <label htmlFor="numberAdress" className="inputAdressNumber">
            Número:
            <input
              data-testid="customer_checkout__input-address-number"
              id="numberAdress"
              type="number"
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
