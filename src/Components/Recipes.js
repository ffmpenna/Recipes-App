import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import DrinkCard from './DrinkCard';
import FoodCard from './FoodCard';

function Recipes({ page }) {
  const history = useHistory();

  const { foods, drinkz, isFilterOn, fetchRecipes, recipes } = useContext(MyContext);

  const MAX_DISPLAY = 12;

  useEffect(() => {
    async function fetchMyAPI() {
      await fetchRecipes(page);
    }
    fetchMyAPI();
  }, [page]);

  const displayCards = (array, type) => {
    if (type === 'meals') {
      return array.map((recipe, index) => (
        <FoodCard
          key={ index }
          index={ index }
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
          id={ recipe.idMeal }
        />
      ));
    }
    if (type === 'drinks') {
      return array.map((recipe, index) => (
        <DrinkCard
          key={ index }
          index={ index }
          name={ recipe.strDrink }
          img={ recipe.strDrinkThumb }
          id={ recipe.idDrink }
        />
      ));
    }
  };

  return (
    <div>
      {isFilterOn ? (
        <div>
          <div disabled={ page === 'drinks' }>
            {foods && foods.length > 1
              ? displayCards(foods, 'meals')
              : foods
                && foods.length === 1
                && history.push(`/meals/${foods[0].idMeal}`)}
          </div>
          <div>
            {drinkz && drinkz.length > 1
              ? displayCards(drinkz, 'drinks')
              : drinkz
                && drinkz.length === 1
                && history.push(`/drinks/${drinkz[0].idDrink}`)}
          </div>
        </div>
      ) : (
        <div>
          <h1>Sem filtro</h1>
          <div>
            {recipes.meals && displayCards(recipes.meals.slice(0, MAX_DISPLAY), 'meals')}
          </div>
          <div>
            {recipes.drinks
              && displayCards(recipes.drinks.slice(0, MAX_DISPLAY), 'drinks')}
          </div>
        </div>
      )}
    </div>
  );
}

Recipes.propTypes = {
  pages: PropTypes.string,
}.isRequired;

export default Recipes;
