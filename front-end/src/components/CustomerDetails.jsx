/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import '../css/CustomerDetails.css';
import { fetchAll, fetchAllUsers, fetchUpdate } from '../services/connectApi';

export default function CustomerDetails({ orderId, statusOrder,
  saleDateOrder, sellerOrderId }) {
  const { sale, orderSelected } = useContext(MyContext);
  const [sales, setSales] = useState([]);
  const [saleId, setSaleId] = useState();
  const [status, setStatus] = useState();
  const [saleDate, setSaleDate] = useState();
  const [sellerName, setSellerName] = useState();
  const [buttonIsDisabled, setButtonIsDisabled] = useState();
  const UPDATESUCCES = 204;

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { role, token } = user;

  const getFetchStatus = async () => {
    const URL = `http://localhost:3001/orders/${orderId}`;
    const statusSale = await fetchAll(URL);
    setStatus(statusSale.status);
  };

  const dateConfig = (date) => {
    const TEN = 10;
    const dateSet = date.slice(0, TEN);
    const formatedDate = dateSet.split('-').reverse().join('/');
    setSaleDate(formatedDate);
  };

  const getSellerName = async () => {
    const sellers = await fetchAllUsers();
    if (role === 'customer') {
      const sellerNameFilter = sellers.filter((item) => sellerOrderId === item.id);
      setSellerName(sellerNameFilter[0].name);
    } else if (role === 'seller') {
      const sellerNameFil = sellers.filter((item) => orderSelected.sellerId === item.id);
      setSellerName(sellerNameFil[0].name);
    }
  };

  const changeStatusOrder = async () => {
    const URL = `http://localhost:3001/status/update/${orderId}`;

    const PAYLOAD = {
      id: orderId,
      status: 'Entregue',
      role,
    };

    const result = await fetchUpdate(URL, PAYLOAD, token);

    if (result === UPDATESUCCES) {
      setStatus('Entregue');
      setButtonIsDisabled(true);
    }
  };

  useEffect(() => {
    if (statusOrder === 'Em Trânsito') {
      setButtonIsDisabled(false);
    } else if (statusOrder === 'Pendente' || statusOrder === 'Preparando'
    || statusOrder === 'Entregue') {
      setButtonIsDisabled(true);
    }
    getFetchStatus();
    setSales(sale);
    getSellerName();
  }, []);

  useEffect(() => {
    if (sales && role === 'customer') {
      setSaleId(orderId);
      // setStatus(sale[0].status);
      dateConfig(saleDateOrder);
    } else if (orderSelected && role === 'seller') {
      // console.log(orderSelected);
      setSaleId(orderSelected.id);
      setStatus(orderSelected.status);
      dateConfig(orderSelected.saleDate);
    }
  }, [sales, orderSelected, sale, statusOrder]);

  return (
    <section className="customerDetailsContainer">
      <div className="pedidoDetailsContainer">
        PEDIDO:
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          { sale && saleId }
        </p>
      </div>
      <div
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        P. Vendedora:
        {' '}
        { sale && sellerName}
      </div>
      <div
        className="pedidoDetailsData"
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        Data:
        {' '}
        { sale && saleDate}
      </div>
      <div
        className="pedidoDetailsStatus"
        data-testid={ `customer_order_details__element-order-details-label-delivery-status
        <index>` }
      >
        Status:
        {' '}
        { sale && status}
      </div>
      <button
        className="pedidoDetailsButton"
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled={ buttonIsDisabled }
        onClick={ changeStatusOrder }
      >
        MARCAR COMO ENTREGUE
      </button>
    </section>
  );
}

CustomerDetails.propTypes = {
  orderId: PropTypes.string,
  statusOrder: PropTypes.string,
  saleDateOrder: PropTypes.string,
  sellerOrderId: PropTypes.string,
}.isRequired;
