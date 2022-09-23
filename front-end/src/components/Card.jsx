/* eslint-disable react-hooks/exhaustive-deps */
import '../css/Card.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Card({ price, img, name, id }) {
  const [qtd, setQtd] = useState(0);
  const value = Number(parseFloat(price).toFixed(2));
  const [totalPrice, setTotalPrice] = useState(0);
  const { setCart, totalValue, setTotalValue,
  } = useContext(MyContext);
  const item = {
    id,
    name,
    qtd,
    price,
    totalPrice: totalPrice.toFixed(2),
  };
  const increment = () => {
    setQtd(qtd + 1);
    setTotalPrice(totalPrice + value);
    setTotalValue(totalValue + value);
    setCart([item]);
  };

  const decrement = () => {
    setQtd(qtd - 1);
    if (qtd === 0) setQtd(0);
    setTotalPrice(totalPrice - value);
    setTotalValue(totalValue - value);
  };

  useEffect(() => {
  }, [qtd, totalPrice]);

  return (
    <section>
      <div className="cardContainer">
        <div className="cardImageContainer">
          <span
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            { price }
          </span>
          <div className="cardImage">
            <img
              src={ img }
              alt="cerveja"
              data-testid={ `customer_products__img-card-bg-image-${id}` }
            />
          </div>
        </div>
        <div className="cardNameContainer">
          <span
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            {name}
          </span>
          <div className="cardQtdContqiner">
            <button type="button" name="less" onClick={ decrement }> - </button>
            <p>{ qtd }</p>
            <button type="button" name="add" onClick={ increment }> + </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Card.propTypes = {
  price: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
}.isRequired;
