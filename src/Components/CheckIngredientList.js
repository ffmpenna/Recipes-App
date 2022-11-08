import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../services/ingredientsHelpers';
import { addInProgress } from '../services/saveProgressOfRecipes';
import Checkbox from './Checkbox';

function CheckIngredientList({ recipe, type }) {
  const { id } = useParams();
  const { ingredients, measure } = getIngredients(recipe);

  useEffect(() => {
    const inProgressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (!inProgressStorage) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ drinks: {}, meals: {} }),
      );
      addInProgress(id, type);
    } else if (!inProgressStorage[type][id]) {
      addInProgress(id, type);
    }
  }, []);

  return (
    <Container>
      {ingredients.map((ingredient, index) => (
        <li className="mb-3" key={ index }>
          <Checkbox
            index={ index }
            ingredient={ ingredient }
            recipe={ recipe }
            measure={ measure }
            type={ type }
          />
        </li>
      ))}
      <div className="clear" />
    </Container>
  );
}

CheckIngredientList.propTypes = {
  recipe: PropTypes.shape({}),
  type: PropTypes.string,
}.isRequired;

export default CheckIngredientList;
