/* eslint-disable react-hooks/exhaustive-deps */
// import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import '../css/CustomerDetails.css';
import { fetchAll, fetchUpdate } from '../services/connectApi';

export default function SellerHeaderOrderDetails() {
  const {
    sale,
    orderSelected,
  } = useContext(MyContext);
  // const history = useHistory();
  const [saleId, setSaleId] = useState();
  const [status, setStatus] = useState();
  const [saleDate, setSaleDate] = useState();
  const [isDisabledPreparing, setIsDisabledPreparing] = useState();
  const [isDisabledDelivery, setIsDisabledDelivery] = useState();
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { role, token } = user;
  const UPDATESUCCES = 204;
  // const statusTrânsito = 'Em Trânsito';

  const getOrderStatus = async () => {
    const URL = `http://localhost:3001/orders/${saleId}`;
    // console.log(URL);
    const result = await fetchAll(URL);
    // console.log('getOrderStatus', result);
    setStatus(result.status);
  };

  const changeOrderStatus = async (action) => {
    const URL = `http://localhost:3001/status/update/${saleId}`;

    const PAYLOAD = {
      id: saleId,
      status: action === 'prepare' ? 'Preparando' : 'Em Trânsito',
      role: 'seller',
    };

    const result = await fetchUpdate(URL, PAYLOAD, token);
    // console.log(result);

    if (result === UPDATESUCCES) {
      setIsDisabledDelivery(false);
      getOrderStatus();
    }
    // setIsDisabledPreparing(true);
  };

  const dateConfig = (date) => {
    const TEN = 10;
    const dateSet = date.slice(0, TEN);
    const formatedDate = dateSet.split('-').reverse().join('/');
    setSaleDate(formatedDate);
  };

  useEffect(() => {
    if (orderSelected && role === 'seller') {
      setSaleId(orderSelected.id);
      setStatus(orderSelected.status);
      dateConfig(orderSelected.saleDate);
    }
  }, []);

  useEffect(() => {
    getOrderStatus();
    if (status === 'Pendente') {
      setIsDisabledDelivery(true);
      setIsDisabledPreparing(false);
    } else if (status === 'Preparando') {
      setIsDisabledPreparing(true);
      setIsDisabledDelivery(false);
    } else if (status === 'Em Trânsito' || status === 'Entregue') {
      setIsDisabledPreparing(true);
      setIsDisabledDelivery(true);
    }
  }, [status]);

  const dataTestId = 'seller_order_details__element-order-details-label-delivery-status';

  return (
    <section className="customerDetailsContainer">
      <div className="pedidoDetailsContainer">
        PEDIDO:
        <p data-testid="seller_order_details__element-order-details-label-order-id">
          { sale && saleId }
        </p>
      </div>
      <div
        className="pedidoDetailsData"
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        Data:
        {' '}
        { sale && saleDate}
      </div>
      <div
        className="pedidoDetailsStatus"
      >
        Status:
        {' '}
        <span data-testid={ dataTestId }>{ sale && status}</span>
      </div>
      <button
        className="pedidoDetailsButtonSecondary"
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        onClick={ () => changeOrderStatus('prepare') }
        disabled={ isDisabledPreparing }
      >
        PREPARAR PEDIDO
      </button>
      <button
        className="pedidoDetailsButton"
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        disabled={ isDisabledDelivery }
        onClick={ changeOrderStatus }
      >
        SAIU PARA ENTREGA
      </button>
    </section>
  );
}
