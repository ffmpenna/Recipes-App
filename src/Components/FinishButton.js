import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { addDone } from '../services/saveProgressOfRecipes';

function FinishButton({ type, recipe }) {
  const history = useHistory();
  const { isFinished } = useContext(MyContext);

  const attributes = {
    recipeId: type === 'meals' ? 'idMeal' : 'idDrink',
    name: type === 'meals' ? 'strMeal' : 'strDrink',
    thumb: type === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
    category: 'strCategory',
    nationality: 'strArea',
    alcoholicOrNot: type === 'meals' ? '' : 'strAlcoholic',
    tags: 'strTags',
    recipeType: type === 'meals' ? 'meal' : 'drink',
  };

  const {
    recipeId,
    name,
    thumb,
    category,
    nationality,
    alcoholicOrNot,
    tags,
    recipeType,
  } = attributes;

  const handleClick = () => {
    const now = new Date();

    const date = `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`;

    const finishedRecipe = {
      id: recipe[recipeId],
      nationality: recipe[nationality] ? recipe[nationality] : '',
      name: recipe[name],
      category: recipe[category],
      image: recipe[thumb],
      tags: recipe[tags] ? recipe[tags].split(',') : [],
      alcoholicOrNot: recipe[alcoholicOrNot] ? recipe[alcoholicOrNot] : '',
      type: recipeType,
      doneDate: date,
    };
    addDone(finishedRecipe);
    history.push('/done-recipes');
  };

  return (
    <Button
      className="button footer-container"
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !isFinished }
      onClick={ handleClick }
      variant="warning"
    >
      Finish
    </Button>
  );
}

FinishButton.propTypes = {
  type: PropTypes.string,
  recipe: PropTypes.shape(),
}.isRequired;

export default FinishButton;
