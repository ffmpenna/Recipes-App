import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import DrinkCard from './DrinkCard';
import FoodCard from './FoodCard';

function Recipes({ page }) {
  const history = useHistory();

  const {
    isFilterOn,
    recipes,
    categories,
    setCategories,
    fetchRecipes,
    fetchRecipesByCategory,
  } = useContext(MyContext);

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, [page]);

  const MAX_DISPLAY = 12;
  const LENGTH = 5;

  const displayCards = (array, type, quantity) => {
    if (type === 'meals') {
      return array.slice(0, quantity).map((recipe, index) => (
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
      return array.slice(0, quantity).map((recipe, index) => (
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

  const selectCategory = async ({ target }) => {
    const { value } = target;
    await setCategories({ ...categories, selectedCategory: value });
    if (value !== categories.selectedCategory) {
      fetchRecipesByCategory(page, value);
    } else {
      setCategories({ ...categories, selectedCategory: '' });
      fetchRecipesByCategory(page, 'all');
    }
  };

  return (
    <div>
      <div>
        {categories.allCategories[page]
          && categories.allCategories[page]
            .filter((_e, i) => i < LENGTH)
            .map((category, index) => (
              <label htmlFor={ `${category}${index}` } key={ index }>
                <input
                  data-testid={ `${category.strCategory}-category-filter` }
                  type="radio"
                  id={ `${category}${index}` }
                  name="category"
                  value={ category.strCategory }
                  onClick={ selectCategory }
                />
                {category.strCategory}
              </label>
            ))}
      </div>
      <button
        className="button"
        data-testid="All-category-filter"
        type="button"
        onClick={ async () => fetchRecipesByCategory(page, 'all') }
      >
        All
      </button>
      {isFilterOn ? (
        <div>
          <h1>filtro on</h1>
          <div>
            {recipes[page] ? (
              displayCards(recipes[page], page, MAX_DISPLAY)
            ) : (
              <h1>Carregando...</h1>
            )}
            {recipes.drinks.length === 1
              && history.push(`/drinks/${recipes.drinks[0].idDrink}`)}
            {recipes.meals.length === 1
              && history.push(`/meals/${recipes.meals[0].idMeal}`)}
          </div>
        </div>
      ) : (
        <div>
          <h1>filtro off</h1>
          {recipes.meals && page === 'meals' ? (
            <div>
              {displayCards(recipes.meals, 'meals', MAX_DISPLAY)}
            </div>
          ) : (
            <div>
              {displayCards(recipes.drinks, 'drinks', MAX_DISPLAY)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Recipes.propTypes = {
  pages: PropTypes.string,
}.isRequired;

export default Recipes;
