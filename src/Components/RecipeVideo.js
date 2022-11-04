import PropTypes from 'prop-types';
import React from 'react';

function RecipeVideo({ type, recipe }) {
  const attributes = {
    name: type === 'meals' ? 'strMeal' : 'strDrink',
    youtube: 'strYoutube',
  };

  const { name, youtube } = attributes;

  return (
    <div>
      <h3 className="h2">Video</h3>
      <iframe
        data-testid="video"
        title={ recipe[name] }
        src={ recipe[youtube] }
      >
        Video
      </iframe>
    </div>
  );
}

RecipeVideo.propTypes = {
  type: PropTypes.string,
  recipe: PropTypes.shape(),
}.isRequired;

export default RecipeVideo;
