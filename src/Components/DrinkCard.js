import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function DrinkCard(props) {
  const { index, img, name, id } = props;
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <Link
        to={ `/drinks/${id}` }
        data-testid="product-detail-link"
      >
        <img
          link={ `/drinks/${index}` }
          height="200"
          width="200"
          src={ img }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </Link>
    </section>
  );
}

DrinkCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
