// import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';
import DetailRecipe from '../Components/DetailRecipe';
import Recomendations from '../Components/Recomendations';

function DetailMeal() {
  return (
    <div>
      <DetailRecipe type="meals" />
      <Recomendations type="drinks" />
    </div>
  );
}

// DetailMeal.propTypes = {};

export default DetailMeal;
