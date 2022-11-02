import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeCard(props) {
  const { index, img, name, id, type } = props;
  const history = useHistory();
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <button
        type="button"
        data-testid="product-detail-link"
        onClick={ () => history.push(`/${type}/${id}`) }
      >
        <img
          height="200"
          width="200"
          src={ img }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </button>
    </section>
  );
}

RecipeCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
