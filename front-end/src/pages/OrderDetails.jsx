import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Header from '../components/Header';

export default function OrderDetails() {
  const { sale } = useContext(MyContext);
  const history = useHistory();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setSales(sale);
    // console.log('pagina orders', sales);
  }, []);

  return (
    <div>
      <Header pageName="Orders" />
      <p>Pagina de compras do cliente</p>
      <p>Venda Criada om sucesso</p>
      <div>
        { sale ? (
          sales.map((item) => (
            <div key={ item.id }>
              <p>{item.id}</p>
              <p>{item.quantity}</p>
              <p>{item.saleDate}</p>
              <p>{item.totalPrice}</p>
              <p>{item.deliveryAddress}</p>
              <div>
                {
                  item.products.map((product) => (
                    <div key={ product.saleId }>
                      <p>{product.productId}</p>
                      <p>{product.quantity}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          ))) : <p>Erro</p> }
      </div>
      <button
        type="button"
        onClick={ () => history.push('/customer/checkout') }
      >
        VOLTAR
      </button>
    </div>
  );
}
