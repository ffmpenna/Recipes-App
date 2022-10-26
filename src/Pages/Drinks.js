import React from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Footer from './Footer';
// import PropTypes from 'prop-types'

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <SearchBar page="drinks" />
      <Footer />
    </>
  );
}

// Drinks.propTypes = {}

export default Drinks;
