/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAll } from '../services/connectApi';
import '../css/SellerOrders.css';
import dateConfig from '../util/editDate';
import MyContext from '../context/MyContext';

export default function SellerOrders() {
  const history = useHistory();
  const FOUR = 4;
  const [orders, setOrders] = useState();
  const [statusClass, setStatusClass] = useState();
  const { setOrderSelected } = useContext(MyContext);
  // const [status, setStatus] = useState();

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { id } = user;

  const getAllOrders = async () => {
    const url = `http://localhost:3001/seller/orders/${id}`;
    const result = await fetchAll(url);
    setOrders(result);
  };

  const getOrderStatus = (status) => {
    let result = '';
    if (status) {
      if (status === 'Pendente') {
        result = 'pending';
      } else if (status === 'Entregue') {
        result = 'delivered';
      } else if (status === 'Preparando') {
        result = 'preparing';
      } else if (status === 'Em Trânsito') {
        result = 'out';
      }
    }
    // console.log('ei', result);
    return setStatusClass(result);
  };

  const viewOrderDetails = (order) => {
    // console.log('o', order);
    setOrderSelected(order);
    history.push(`/seller/orders/${order.id}`);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (orders) {
      orders.forEach((item) => getOrderStatus(item.status));
    }
  }, [orders]);

  return (
    <section
      className="container-sellerOrders"
    >
      {orders && (
        orders.map((item) => (
          <button
            type="button"
            key={ item.id }
            className="order-sellerOrders"
            onClick={ () => viewOrderDetails(item) }
          >
            <div className="order-Client-orderCard">
              <p data-testid={ `seller_orders__element-order-id-${item.id}` }>
                <span>Pedido</span>
                {`${item.id}`.padStart(FOUR, '0')}
              </p>
              <p>
                <span>Cliente</span>
                {`${item.userId}`.padStart(FOUR, '0')}
              </p>
            </div>
            <div className="second-orderCard">
              <div className="status-date-value-orderCard">
                <div className={ `status-orderCard-${statusClass}` }>
                  <p
                    data-testid={ `seller_orders__element-delivery-status-${item.id}` }
                  >
                    {`${item.status}`}
                  </p>
                </div>
                <div className="date-price-orderCard">
                  <p
                    className="date-orderCard"
                    data-testid={ `seller_orders__element-order-date-${item.id}` }
                  >
                    {dateConfig(item.saleDate)}
                  </p>
                  <p
                    className="total-orderCard"
                    data-testid="seller_orders__element-card-price-<id>"
                  >
                    R$:
                    {' '}
                    {`${item.totalPrice}`.replace('.', ',')}
                  </p>
                </div>
              </div>
              <div className="adress-orderCard">
                <p
                  data-testid={ `seller_orders__element-card-address-${item.id}` }
                >
                  {`${item.deliveryAddress}, ${item.deliveryNumber}`}
                </p>
              </div>
            </div>
          </button>
        ))
      )}
    </section>
  );
}
