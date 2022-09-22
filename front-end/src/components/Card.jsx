import '../css/Card.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Card({ price, img, name, id }) {
  const [qtd, setQtd] = useState(0);

  const increment = () => {
    setQtd(qtd + 1);
  };

  const decrement = () => {
    setQtd(qtd - 1);
    if (qtd === 0) setQtd(0);
  };

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
