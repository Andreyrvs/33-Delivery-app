/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchAll } from '../services/connectApi';
import dateConfig from '../util/editDate';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState();
  const history = useHistory();
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { id } = user;

  const getOrderByUser = async () => {
    const URL = `http://localhost:3001/customer/orders/${id}`;
    const result = await fetchAll(URL);
    setOrders(result);
  };

  useEffect(() => {
    getOrderByUser();
  }, []);

  return (
    <section>
      <Header pageName="PRODUTOS" />
      <div>Meus pedidos</div>
      {orders && (
        orders.map((item) => (
          <button
            key={ item.id }
            type="button"
            onClick={ () => history.push(`/customer/orders/${item.id}`) }
          >
            <p
              data-testid={ `customer_orders__element-order-id-${item.id}` }
            >
              {item.id}
            </p>
            <p
              data-testid={ `customer_orders__element-delivery-status-${item.id}` }
            >
              {item.status}
            </p>
            <p
              data-testid={ `customer_orders__element-order-date-${item.id}` }
            >
              {dateConfig(item.saleDate)}
            </p>
            <p
              data-testid={ `customer_orders__element-card-price-${item.id}` }
            >
              {`${item.totalPrice}`.replace('.', ',')}
            </p>
          </button>
        ))
      ) }
    </section>
  );
}
