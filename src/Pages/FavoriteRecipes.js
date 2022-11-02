// import PropTypes from 'prop-types';
import React from 'react';
import FavRecipes from '../Components/FavRecipes';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <>
      <Header title="Favorite Recipes" withoutSearch />
      <FavRecipes />
    </>
  );
}

// FavoriteRecipes.propTypes = {};

export default FavoriteRecipes;
