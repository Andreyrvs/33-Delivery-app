/* eslint-disable react-hooks/exhaustive-deps */
// import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import '../css/CustomerDetails.css';

export default function SellerHeaderOrderDetails() {
  const {
    sale,
    orderSelected,
    setStatusOrderGlobal,
    statusOrderGlobal } = useContext(MyContext);
  // const history = useHistory();
  const [saleId, setSaleId] = useState();
  const [status, setStatus] = useState();
  const [saleDate, setSaleDate] = useState();
  const [isDisabledPreparing, setIsDisabledPreparing] = useState();
  const [isDisabledDelivery, setIsDisabledDelivery] = useState();

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { role } = user;
  const statusTrânsito = 'Em Trânsito';

  const getOrderPreparingStatus = () => {
    const statusVerify = ['Preparando', statusTrânsito, 'Entregue'];
    const statusNow = statusVerify.some((item) => item.includes(status));
    console.log(statusNow);
    if (statusNow === true) {
      setIsDisabledPreparing(true);
      setIsDisabledDelivery(false);
    } else {
      setIsDisabledPreparing(false);
      setIsDisabledDelivery(true);
    }
  };

  const changeStatusGlobal = () => {
    setStatusOrderGlobal('Preparando');
    setStatus('Preparando');
    setIsDisabledDelivery(false);
    // setIsDisabledPreparing(true);
  };

  const dateConfig = (date) => {
    const TEN = 10;
    const dateSet = date.slice(0, TEN);
    const formatedDate = dateSet.split('-').reverse().join('/');
    setSaleDate(formatedDate);
  };

  useEffect(() => {
    getOrderPreparingStatus();
    if (orderSelected && role === 'seller' && statusOrderGlobal) {
      setSaleId(orderSelected.id);
      setStatus('Pendente');
      dateConfig(orderSelected.saleDate);
    }
  }, []);

  const dataTestId = 'seller_order_details__element-order-details-label-delivery-status';

  useEffect(() => {
    getOrderPreparingStatus();
  }, [statusOrderGlobal, setStatusOrderGlobal, status]);

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
        onClick={ changeStatusGlobal }
        disabled={ isDisabledPreparing }
      >
        PREPARAR PEDIDO
      </button>
      <button
        className="pedidoDetailsButton"
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        disabled={ isDisabledDelivery }
        onClick={ () => {
          setStatusOrderGlobal(statusTrânsito);
          setStatus(statusTrânsito);
        } }
      >
        SAIU PARA ENTREGA
      </button>
    </section>
  );
}
