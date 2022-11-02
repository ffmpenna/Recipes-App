import PropTypes from 'prop-types';
import React from 'react';
import { createIngredientsList } from '../services/ingredientsHelpers';

function IngredientList({ recipe }) {
  return <div>{createIngredientsList(recipe)}</div>;
}

IngredientList.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default IngredientList;
