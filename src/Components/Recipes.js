import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';

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
    const attributes = {
      id: type === 'meals' ? 'idMeal' : 'idDrink',
      name: type === 'meals' ? 'strMeal' : 'strDrink',
      thumb: type === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
    };

    const { name, thumb, id } = attributes;

    return array
      .filter((_e, i) => i < quantity)
      .map((recipe, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          name={ recipe[name] }
          img={ recipe[thumb] }
          type={ type }
          id={ recipe[id] }
        />
      ));
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
            <div>{displayCards(recipes.meals, 'meals', MAX_DISPLAY)}</div>
          ) : (
            <div>{displayCards(recipes.drinks, 'drinks', MAX_DISPLAY)}</div>
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
