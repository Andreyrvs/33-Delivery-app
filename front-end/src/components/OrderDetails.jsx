/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/OrderDetailsPage.css';
import { fetchAll } from '../services/connectApi';
import { formattedNumber } from '../util/changeNumber';
import CustomerDetails from './CustomerDetails';

export default function OrderDetails() {
  const [cartOrder, setCartOrder] = useState();
  const [productsList, setProductsList] = useState();
  const { pathname } = useLocation();
  const idOrderAdress = pathname.split('/');

  const getFetchOrder = async () => {
    const URL = `http://localhost:3001/orders/${idOrderAdress[3]}`;
    const result = await fetchAll(URL);
    setCartOrder([result]);
    setProductsList(result.products);
  };

  useEffect(() => {
    getFetchOrder();
  }, []);

  return (
    <section className="checkout">
      <section className="finalize-order">
        <p className="finalize-order-text">Detalhe do Pedido</p>
      </section>
      {cartOrder && (
        <CustomerDetails
          orderId={ idOrderAdress[3] }
          statusOrder={ cartOrder[0].status }
          saleDateOrder={ cartOrder[0].saleDate }
          sellerOrderId={ cartOrder[0].sellerId }
        />
      )}
      <section className="checkout-container">
        <section className="checkout-titulo">
          <section className="titulo-left-container">
            <p className="titulo-left">Item</p>
            <p className="titulo-descricao">Descrição</p>
          </section>
          <section className="titulo-right-container">
            <p className="titulo-right">Quantidade</p>
            <p className="titulo-right">Valor Unitário</p>
            <p className="titulo-right">Sub-total</p>
          </section>
        </section>
        { cartOrder && productsList && (
          productsList.map((item, index) => (
            <section key={ item.id } className="item-container">
              <section className="left-container">
                <section
                  className="item-number"
                >
                  <p
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}

                  </p>
                </section>
                <section
                  className="item-description"
                >
                  <p
                    data-testid={ `customer_order_details__element-order-table-name
                    -${index}` }
                  >
                    {item.name}

                  </p>
                </section>
              </section>
              <section className="right-container">
                <section className="item-quantity">
                  <p
                    className="quantity-text"
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    {item.quantity}

                  </p>
                </section>
                <section className="item-price">
                  <p
                    className="price-text"
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    {formattedNumber(item.price).replace('.', ',')}

                  </p>
                </section>
                <section className="item-total-price">
                  <p
                    className="total-price-text"
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    {formattedNumber(item.price * item.quantity)}
                  </p>
                </section>
              </section>
            </section>
          ))
        ) }
        <section className="checkout-total-container">

          <section className="checkout-total">
            <p
              className="checkout-total-text"
              data-testid="customer_order_details__element-order-total-price"
            >
              Total:
              {' '}
              {cartOrder && formattedNumber(cartOrder[0].totalPrice).replace('.', ',')}
            </p>
          </section>
        </section>
      </section>
    </section>
  );
}
