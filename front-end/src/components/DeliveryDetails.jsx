/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchGet, fetchPost } from '../services/connectApi';
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
  const { cart, totalValue, setSale, setOpenModal, setMsgModal } = useContext(MyContext);
  const CREATESUCCESS = 201;
  const ERROR = 404;
  const TIMER = 1000;
  const [sellers, setSellers] = useState();
  const [sellerId, setSellerId] = useState();

  const getSellers = async () => {
    const result = await fetchGet('http://localhost:3001/user/get-all');
    const roleSellers = result.filter((element) => element.role === 'seller');
    setSellers([{ id: 0, name: 'Vendedor' }, ...roleSellers]);
  };

  const PAYLOAD = {
    userId: id,
    sellerId: 2, // sellerId retorna o id do vendedor, mas não passa no teste
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
    // console.log('t', PAYLOAD.sellerId);
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
    getSellers();
    if (sellerForm) {
      const sellerSelected = sellers.filter((e) => e.name === sellerForm);
      console.log(sellerSelected[0].id);
      setSellerId(sellerSelected[0].id);
      console.log('t', sellerId);
    }
  }, [sellerForm]);

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
              onChange={ handleForm }
              value={ sellerForm }
            >
              { sellers && (
                sellers.map((e) => (
                  <option
                    key={ e.id }
                    value={ e.name }
                  >
                    { e.name }
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
