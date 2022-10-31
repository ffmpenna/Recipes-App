import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import SearchBar from '../Components/SearchBar';
// import PropTypes from 'prop-types'

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <SearchBar page="drinks" />
      <Recipes page="drinks" />
      <Footer />
    </>
  );
}

// Drinks.propTypes = {}

export default Drinks;
