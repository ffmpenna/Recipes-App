import PropTypes from 'prop-types';
import React from 'react';

function RecipeVideo({ type, recipe }) {
  const attributes = {
    name: type === 'meals' ? 'strMeal' : 'strDrink',
    youtube: 'strYoutube',
  };

  const { name, youtube } = attributes;

  return (
    <iframe
      height="480px"
      width="640px"
      data-testid="video"
      title={ recipe[name] }
      src={ recipe[youtube] }
    >
      Video
    </iframe>
  );
}

RecipeVideo.propTypes = {
  type: PropTypes.string,
  recipe: PropTypes.shape(),
}.isRequired;

export default RecipeVideo;
