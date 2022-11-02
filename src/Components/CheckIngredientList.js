import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../services/ingredientsHelpers';
import { addInProgress } from '../services/saveProgressOfRecipes';
import Checkbox from './Checkbox';

function CheckIngredientList({ recipe, type }) {
  const { id } = useParams();
  const { ingredients, measure } = getIngredients(recipe);

  useEffect(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
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

  return ingredients.map((ingredient, index) => (
    <ul key={ index }>
      <li>
        <Checkbox
          index={ index }
          ingredient={ ingredient }
          recipe={ recipe }
          measure={ measure }
          type={ type }
        />
      </li>
    </ul>
  ));
}

export default CheckIngredientList;
