import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../css/FinalizeCard.css';
import { formattedNumber } from '../util/changeNumber';

export default function FinalizeCard() {
  const { cart, setCart, totalValue } = useContext(MyContext);

  const handleCheckout = (id) => {
    const removedItem = cart.filter((item) => item.id !== id);
    setCart(removedItem);
    return removedItem;
  };

  return (
    <section className="checkout">
      <section className="finalize-order">
        <p className="finalize-order-text">Finalizar Pedido</p>
      </section>
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
            <p className="titulo-remover">Remover Item</p>
          </section>
        </section>
        { cart && (
          cart.map((item, index) => (
            <section key={ item.id } className="item-container">
              <section className="left-container">
                <section
                  className="item-number"
                >
                  <p
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}

                  </p>
                </section>
                <section
                  className="item-description"
                >
                  <p
                    data-testid={ `customer_checkout__element-order-table-name-${index}` }
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
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {item.qtd}

                  </p>
                </section>
                <section className="item-price">
                  <p
                    className="price-text"
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {formattedNumber(item.price)}

                  </p>
                </section>
                <section className="item-total-price">
                  <p
                    className="total-price-text"
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {formattedNumber(item.totalPrice)}
                  </p>
                </section>
                <section className="item-button">
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    className="button-remove"
                    type="button"
                    onClick={ () => handleCheckout(item.id) }
                  >
                    Remover
                  </button>
                </section>
              </section>
            </section>
          ))
        ) }
        <section className="checkout-total-container">

          <section className="checkout-total">
            <p
              className="checkout-total-text"
              data-testid="customer_checkout__element-order-total-price"
            >
              Total:
              {' '}
              {formattedNumber(totalValue)}
            </p>
          </section>
        </section>
      </section>
    </section>
  );
}
