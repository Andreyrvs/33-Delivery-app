/* eslint-disable react-hooks/exhaustive-deps */
import '../css/Card.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import { changeNum } from '../util/changeNumber';

export default function Card({ price, img, name, id }) {
  const [qtd, setQtd] = useState(0);
  const value = Number(parseFloat(changeNum(price)).toFixed(2));
  const [totalPrice, setTotalPrice] = useState(0);
  const { setCart, cart, setTotalValue, totalValue } = useContext(MyContext);

  const item = {
    id,
    qtd,
    name,
    price,
    totalPrice,
  };

  const increment = () => {
    setQtd(() => qtd + 1);
    setTotalPrice(totalPrice + value);
    setTotalValue(totalValue + value);
  };

  const decrement = () => {
    if (qtd <= 0) {
      setQtd(0);
    } else {
      setQtd(qtd - 1);
      setTotalPrice(totalPrice - value);
      setTotalValue(totalValue - value);
    }
  };

  const handleQtd = ({ target }) => {
    setQtd(Number(target.value));
    setTotalPrice(target.value * value);
  };

  const findElementUpdate = (arr) => {
    const findElement = arr.filter((ele) => {
      if (ele.id === item.id) {
        ele.qtd = item.qtd;
        ele.totalPrice = item.totalPrice;
      }
      return ele;
    });
    return findElement;
  };

  useEffect(() => {
    if (qtd) {
      findElementUpdate(cart);
      const findElement = cart.find((element) => element.id === item.id);
      if (!findElement) {
        setCart(() => [...cart, item]);
      }
    }
  }, [qtd, cart]);

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
            <button
              type="button"
              name="less"
              onClick={ decrement }
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              -
            </button>
            <input
              name="quantity"
              aria-label="cost-input"
              value={ qtd }
              type="text"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              onChange={ handleQtd }
            />
            <button
              type="button"
              name="add"
              onClick={ increment }
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              +
            </button>
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
