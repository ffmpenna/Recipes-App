import React from 'react';
import '../App.css';
import DetailRecipe from '../Components/DetailRecipe';
import Recomendations from '../Components/Recomendations';
// import PropTypes from 'prop-types'

function DetailDrink() {
  return (
    <div>
      <DetailRecipe type="drinks" />
      <Recomendations type="meals" />
    </div>
  );
}

// DetailDrink.propTypes = {}

export default DetailDrink;
