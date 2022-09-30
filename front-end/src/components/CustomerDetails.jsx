// import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import '../css/CustomerDetails.css';
import { fetchAllUsers } from '../services/connectApi';

export default function CustomerDetails() {
  const { sale, orderSelected } = useContext(MyContext);
  // const history = useHistory();
  const [sales, setSales] = useState([]);
  const [saleId, setSaleId] = useState();
  const [status, setStatus] = useState();
  const [saleDate, setSaleDate] = useState();
  const [sellerName, setSellerName] = useState();

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { role } = user;

  const dateConfig = (date) => {
    const TEN = 10;
    const dateSet = date.slice(0, TEN);
    const formatedDate = dateSet.split('-').reverse().join('/');
    setSaleDate(formatedDate);
  };

  const getSellerName = async () => {
    const sellers = await fetchAllUsers();
    if (role === 'customer') {
      const sellerNameFilter = sellers.filter((item) => sale[0].sellerId === item.id);
      setSellerName(sellerNameFilter[0].name);
    } else if (role === 'seller') {
      const sellerNameFil = sellers.filter((item) => orderSelected.sellerId === item.id);
      setSellerName(sellerNameFil[0].name);
    }
  };

  useEffect(() => {
    setSales(sale);
    getSellerName();
  }, []);

  useEffect(() => {
    if (sales && role === 'customer') {
      // console.log(sales);
      setSaleId(sale[0].id);
      setStatus(sale[0].status);
      dateConfig(sale[0].saleDate);
    } else if (orderSelected && role === 'seller') {
      // console.log(orderSelected);
      setSaleId(orderSelected.id);
      setStatus(orderSelected.status);
      dateConfig(orderSelected.saleDate);
    }
  }, [sales, orderSelected, sale]);

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
        disabled
        onClick={ () => setStatus('Entregue') }
      >
        MARCAR COMO ENTREGUE
      </button>
    </section>
  );
}
