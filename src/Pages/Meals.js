// import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Footer from './Footer';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <SearchBar page="meals" />
      <Footer />
    </div>
  );
}

Meals.propTypes = {};

export default Meals;
