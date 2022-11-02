import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { getIngredients } from '../services/ingredientsHelpers';
import {
  addUsedIngridient,
  readInProgress,
  removeUsedIngridient,
} from '../services/saveProgressOfRecipes';

function Checkbox({ index, ingredient, measure, type, recipe }) {
  const { id } = useParams();
  const [checked, setCheck] = useState(false);

  const { setFinished } = useContext(MyContext);

  const valitadeButton = () => {
    const usedIngredients = readInProgress()[type][id].length;
    const allIngredients = getIngredients(recipe).ingredients.length;

    console.log(usedIngredients, allIngredients);

    if (usedIngredients === allIngredients) {
      setFinished(true);
    } else {
      setFinished(false);
    }
  };

  useEffect(() => {
    valitadeButton();
  });

  useEffect(() => {
    if (readInProgress()[type][id]) {
      setCheck(readInProgress()[type][id].some((e) => e === ingredient));
    }
  }, [ingredient, id, type]);

  const handleChange = () => {
    if (checked) {
      removeUsedIngridient(id, type, ingredient);
      setCheck(false);
    } else if (!checked) {
      addUsedIngridient(id, type, ingredient);
      setCheck(true);
    }
  };
  return (
    <label
      htmlFor={ `teste${index}` }
      className={ checked ? 'ingredient-check' : 'ingredient-not-check' }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        type="checkbox"
        value={ ingredient }
        id={ `teste${index}` }
        checked={ checked }
        onChange={ handleChange }
      />
      {` ${measure[index]} ${ingredient}`}
    </label>
  );
}

Checkbox.propTypes = {
  index: PropTypes.number,
  ingredient: PropTypes.string,
  measure: PropTypes.shape({}),
  type: PropTypes.string,
  recipe: PropTypes.shape(),
}.isRequired;

export default Checkbox;
