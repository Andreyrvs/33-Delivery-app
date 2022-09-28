/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Header from '../components/Header';

export default function OrderDetails() {
  const { sale, cart, setOpenModal } = useContext(MyContext);
  const history = useHistory();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setSales(sale);
    setOpenModal(false);
    // console.log(cart);
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
              <p>
                Pedido:
                {item.id}
              </p>
              <p>
                Vendedora:
                {item.sellerId}
              </p>
              <p>
                Data
                {item.saleDate}
              </p>
              <p>
                Status
                {item.totalPrice}
              </p>
              <div>
                {
                  item.products.map((product, index) => (
                    <div key={ `product.${product.saleId + index}` }>
                      <p>{index}</p>
                      <p>
                        Nome do Produto:
                        {
                          cart.map((cartItem) => {
                            let price = '';
                            if (cartItem.id === product.productId) {
                              price = cartItem.name;
                            }
                            return price;
                          })
                        }
                      </p>
                      <p>
                        Quantidade:
                        {product.quantity}
                      </p>
                      <p>
                        Valor unitário R$
                        {
                          cart.map((cartItem) => {
                            let price = '';
                            if (cartItem.id === product.productId) {
                              price = cartItem.price;
                            }
                            return price;
                          })
                        }
                      </p>
                      <p>
                        Sub-Total:
                        {
                          cart.map((cartItem) => {
                            let price = '';
                            if (cartItem.id === product.productId) {
                              price = cartItem.totalPrice;
                            }
                            return price;
                          })
                        }
                      </p>
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
