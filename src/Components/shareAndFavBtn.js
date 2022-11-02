/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { addRecipe, readFavorites, removeRecipe } from '../services/saveRecipe';

const copy = require('clipboard-copy');

function ShareAndFavoriteBtn({ recipes, testId, page, hideCard }) {
  const {
    location: { pathname },
  } = useHistory();
  const [isCopy, setCopy] = useState(false);
  const [isCheck, setCheck] = useState(
    readFavorites()
      ? readFavorites().some(
        (e) => e.id === recipes.idMeal
            || e.id === recipes.idDrink
            || e.id === recipes.id,
      )
      : false,
  );

  const clipboardLink = (pageTitle) => {
    if (pageTitle === 'favoriteRecipes') {
      copy(`http://localhost:3000/${recipes.type}s/${recipes.id}`);
      setCopy(true);
    } else {
      copy(`http://localhost:3000${pathname}`);
      setCopy(true);
    }
  };
  const handleFavorite = useCallback(() => {
    const recipe = {
      id: recipes.idMeal ? recipes.idMeal : recipes.idDrink,
      type: recipes.idMeal ? 'meal' : 'drink',
      nationality: recipes.strArea ? recipes.strArea : '',
      category: recipes.strCategory,
      alcoholicOrNot: recipes.strAlcoholic ? recipes.strAlcoholic : '',
      name: recipes.strMeal ? recipes.strMeal : recipes.strDrink,
      image: recipes.strMealThumb
        ? recipes.strMealThumb
        : recipes.strDrinkThumb,
    };

    if (isCheck && page !== 'favoriteRecipes') {
      removeRecipe(recipe);
      setCheck(false);
    } else if (!isCheck && page !== 'favoriteRecipes') {
      addRecipe(recipe);
      setCheck(true);
    } else if (isCheck) {
      removeRecipe(recipes);
      hideCard();
      setCheck(false);
    } else {
      addRecipe(recipes);
      setCheck(true);
    }
  }, [isCheck]);

  return (
    <div>
      <button
        type="button"
        data-testid={ testId[1] }
        src={ shareIcon }
        onClick={ () => clipboardLink(page) }
      >
        <img src={ shareIcon } alt="share-btn" />
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
        src={ isCheck ? blackHeartIcon : whiteHeartIcon }
      >
        {isCheck ? (
          <img src={ blackHeartIcon } alt="favorite" data-testid={ testId[0] } />
        ) : (
          <img src={ whiteHeartIcon } alt="favorite" data-testid={ testId[0] } />
        )}
      </button>
      {isCopy && (
        <div>
          <p>Link copied!</p>
        </div>
      )}
    </div>
  );
}

ShareAndFavoriteBtn.propTypes = {
  idMeal: PropTypes.string,
  idDrink: PropTypes.string,
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
  strAlcoholic: PropTypes.string,
  strMeal: PropTypes.string,
  strDrink: PropTypes.string,
  strMealThumb: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default ShareAndFavoriteBtn;
