import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FoodCard(props) {
  const { index, img, name, id } = props;
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <Link
        to={ `/meals/${id}` }
        data-testid="product-detail-link"
      >
        {/* <link to={ `/meals/${index}` } /> */}
        <img
          link={ `/meals/${index}` }
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

FoodCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
