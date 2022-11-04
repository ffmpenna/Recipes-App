// import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import SearchBar from '../Components/SearchBar';

function Meals() {
  return (
    <div className="with-header">
      <Header title="Meals" />
      <SearchBar page="meals" />
      <Recipes page="meals" />
      <Footer />
    </div>
  );
}

Meals.propTypes = {};

export default Meals;
