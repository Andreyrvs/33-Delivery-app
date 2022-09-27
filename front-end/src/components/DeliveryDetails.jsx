import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../css/DeliveryDetails.css';
import { fetchPost } from '../services/connectApi';

export default function DeliveryDetails() {
  const { cart, totalValue, userLogin } = useContext(MyContext);
  const URL = 'http://localhost:3001/customer/checkout';
  const STATUSOK = 200;
  const NOTFOUND = 404;
  const history = useHistory();

  const checkout = async () => {
    const datas = {
      userId: 3,
      sellerId: 2,
      totalPrice: totalValue,
      deliveryAddress: 'Rua dos Lagartos',
      deliveryNumber: '1000',
      products: cart,
    };

    console.log(userLogin);
    console.log(cart);
    const createdSale = await fetchPost(URL, datas);

    if (createdSale.status === STATUSOK) {
      history.push('/customer/orders');
    } else if (createdSale.status === NOTFOUND) {
      setmsgError('Algo deu errado');
    }
  };

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

  const sendOrder = async (event) => {
    event.preventDefault();
    await checkout();
    console.log('Enviado');
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
              data-testid="customer_checkout__select-seller"
              id="nameSeller"
              type="text"
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
