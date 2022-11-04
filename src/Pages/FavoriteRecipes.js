// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CardsFilter from '../Components/CardsFilter';
import FavCard from '../Components/FavCard';
import Header from '../Components/Header';
import MyContext from '../context/MyContext';
import { readFavorites } from '../services/saveRecipe';

function FavoriteRecipes() {
  const { loginInfo } = useContext(MyContext);
  const favRecipes = readFavorites();

  return (
    <div className="with-header">
      <Header title="Favorite Recipes" withoutSearch />
      <CardsFilter type="favorite" />
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
