/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchPost, fetchAllUsers } from '../services/connectApi';
import '../css/DeliveryDetails.css';

export default function DeliveryDetails() {
  const history = useHistory();
  const [sellerForm, setSellerForm] = useState('Fulana Pereira');
  const [adress, setAdress] = useState('');
  const [numberAdress, setNumber] = useState('');

  // const [sellerId, setSellerId] = useState('Fulana de Tal');
  const [users, setUsers] = useState([]);

  const URL = 'http://localhost:3001/customer/checkout';
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { id, token } = user;
  const { cart, totalValue, setSale, setOpenModal, setMsgModal } = useContext(MyContext);
  const CREATESUCCESS = 201;
  const ERROR = 404;
  const TIMER = 1000;

  const PAYLOAD = {
    userId: id,
    sellerId: 2, // get push sellers
    totalPrice: Number(parseFloat(totalValue).toFixed(2)),
    deliveryAddress: adress,
    deliveryNumber: numberAdress,
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

  const handleSellers = async () => {
    const result = await fetchAllUsers();
    const usersSeller = result.filter(
      (item) => item.role === 'seller',
    );

    setUsers(usersSeller);
    return usersSeller;
  };

  const cleanForm = () => {
    setSellerForm('');
    setAdress('');
    setNumber('');
  };

  const sendOrder = async (event) => {
    event.preventDefault();
    setOpenModal(true);
    cleanForm();

    const result = await fetchPost(URL, PAYLOAD, token);
    if (result.status === CREATESUCCESS) {
      setSale([result.data]);
      setMsgModal('Pedido realizado com seucesso!');
      setTimeout(() => {
        history.push(`/customer/orders/${result.data.id}`);
      }, TIMER);
    } else if (result.status === ERROR) {
      setMsgModal('Falha ao gravar a venda, verifique o nome do vendedor');
    }
  };

  useEffect(() => {
    handleSellers();
  }, []);

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
              value={ sellerForm }
              onChange={ handleForm }
            >
              { users
                && users.map((item) => (
                  <option
                    key={ item.id }
                    value={ item.name }
                  >
                    {item.name}
                  </option>
                ))}
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
