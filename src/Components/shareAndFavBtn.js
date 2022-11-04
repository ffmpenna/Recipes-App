/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { addRecipe, readFavorites, removeRecipe } from '../services/saveRecipe';

const copy = require('clipboard-copy');

function ShareAndFavoriteBtn({ recipes, testId, page, hideCard, type }) {
  const { id } = useParams();
  const [isCopy, setCopy] = useState(false);
  const [isCheck, setCheck] = useState(false);

  useEffect(() => {
    if (readFavorites()) {
      setCheck(
        readFavorites().some(
          (e) => e.id === recipes.idMeal
            || e.id === recipes.idDrink
            || e.id === recipes.id,
        ),
      );
    }
  }, [recipes]);

  const clipboardLink = () => {
    if (page === 'doneRecipes') {
      console.log(recipes);
      copy(`http://localhost:3000/${recipes.type}s/${recipes.id}`);
      setCopy(true);
    } else {
      copy(`http://localhost:3000/${type}/${id}`);
      setCopy(true);
    }
  };

  const handleFavorite = useCallback(() => {
    // console.log(recipes);
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
  }, [isCheck, recipes]);

  return (
    <div className="mb-2 mt-2">
      <Stack direction="horizontal" gap={ 3 }>
        <Button
          type="Button"
          data-testid={ testId[1] }
          onClick={ clipboardLink }
          variant="warning"
          size="sm"
        >
          <img width="20px" src={ shareIcon } alt="share-btn" />
        </Button>
        {page !== 'doneRecipes' && (
          <Button
            type="Button"
            onClick={ handleFavorite }
            src={ isCheck ? blackHeartIcon : whiteHeartIcon }
            variant="warning"
            size="sm"
          >
            {isCheck ? (
              <img
                src={ blackHeartIcon }
                width="20px"
                alt="favorite"
                data-testid={ testId[0] }
              />
            ) : (
              <img
                src={ whiteHeartIcon }
                width="20px"
                alt="favorite"
                data-testid={ testId[0] }
              />
            )}
          </Button>
        )}

        {isCopy && <Badge bg="warning">Copied!</Badge>}
      </Stack>
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
