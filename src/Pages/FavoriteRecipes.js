// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FavCard from '../Components/FavCard';
import Header from '../Components/Header';
import MyContext from '../context/MyContext';
import { readFavorites } from '../services/saveRecipe';

function FavoriteRecipes() {
  const { handleChange, loginInfo } = useContext(MyContext);
  const favRecipes = readFavorites();

  return (
    <div>
      <Header title="Favorite Recipes" withoutSearch />
      <div>
        <label htmlFor="drinks">
          <input
            data-testid="filter-by-drink-btn"
            type="radio"
            value="drink"
            id="drinks"
            name="favoriteFilter"
            onChange={ handleChange }
          />
          Drinks
        </label>
        <label htmlFor="meals">
          <input
            data-testid="filter-by-meal-btn"
            name="favoriteFilter"
            value="meal"
            id="meals"
            type="radio"
            onChange={ handleChange }
          />
          Meals
        </label>
        <label htmlFor="all">
          <input
            name="favoriteFilter"
            value="all"
            id="all"
            data-testid="filter-by-all-btn"
            type="radio"
            onChange={ handleChange }
          />
          All
        </label>
      </div>
      {favRecipes
        && favRecipes
          .filter(
            (e) => e.type === loginInfo.favoriteFilter
              || loginInfo.favoriteFilter === 'all',
          )
          .map((r, i) => (
            <FavCard
              recipe={ r }
              index={ i }
              img={ r.image }
              name={ r.name }
              id={ r.id }
              category={ r.category }
              type={ r.type }
              nationality={ r.nationality }
              alcoholicOrNot={ r.alcoholicOrNot }
              key={ r.id }
            />
          ))}
    </div>
  );
}

// FavoriteRecipes.propTypes = {};

export default FavoriteRecipes;
