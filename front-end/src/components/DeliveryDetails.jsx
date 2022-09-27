import { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
// import MyContext from '../context/MyContext';
import '../css/DeliveryDetails.css';
import { fetchAllUsers } from '../services/connectApi';

export default function DeliveryDetails() {
  const { cart, totalValue } = useContext(MyContext);
  const [seller, setSeller] = useState(1);
  const [adress, setAdress] = useState('');
  const [numberAdress, setNumber] = useState('');
  const [users, setUsers] = useState([]);
  // const URL = 'http://localhost:3001/customer/checkout';

  const checkout = () => {
    const datas = {
      userId: 3,
      sellerId: seller,
      totalPrice: totalValue,
      deliveryAddress: adress,
      deliveryNumber: numberAdress,
      products: cart,
    };

    // const createdSale = await fetchPost(URL, datas);
    console.log(datas);

    // return createdSale;
  };

  const handleForm = ({ target }) => {
    if (target.name === 'nameSeller') setSeller(target.value);
    if (target.name === 'adress') setAdress(target.value);
    if (target.name === 'numberAdress') setNumber(target.value);
  };

  const handleSellers = async () => {
    const result = await fetchAllUsers();
    setUsers(result);
    return result;
  };

  const cleanForm = () => {
    setSeller('');
    setAdress('');
    setNumber('');
  };

  const sendOrder = async (event) => {
    event.preventDefault();
    checkout();
    cleanForm();
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
