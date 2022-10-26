import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import DrinkCard from './DrinkCard';
import FoodCard from './FoodCard';
// import PropTypes from 'prop-types'

function Recipes({ page }) {
  const { fetchRecipes, setRecipes, recipes } = useContext(MyContext);

  useEffect(() => {
    (async () => {
      const getApi = await fetchRecipes(page);
      if (page === 'meals') {
        setRecipes(getApi.meals);
      } else {
        setRecipes(getApi.drinks);
      }
    })();
  }, [fetchRecipes, setRecipes, page]);

  return (
    <div>
      {page === 'meals'
        && recipes
          .splice(0, 12)
          .map((recipe, index) => (
            <FoodCard
              key={ index }
              index={ index }
              name={ recipe.strMeal }
              img={ recipe.strMealThumb }
              id={ recipe.idMeal }
            />
          ))}
      {page === 'drinks'
        && recipes
          .splice(0, 12)
          .map((recipe, index) => (
            <DrinkCard
              key={ index }
              index={ index }
              name={ recipe.strDrink }
              img={ recipe.strDrinkThumb }
              id={ recipe.idDrink }
            />
          ))}
    </div>
  );
}

// Recipes.propTypes = {}

export default Recipes;
