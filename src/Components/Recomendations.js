import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Recomendations({ type }) {
  const { fetchRecipes, recipes } = useContext(MyContext);
  const SIX = 6;

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, []);

  const attributes = {
    name: type === 'meals' ? 'strMeal' : 'strDrink',
    thumb: type === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
  };

  const { name, thumb } = attributes;

  return (
    <div>
      <h1 className="header">Recomendações</h1>
      <div className="horizontal-slider">
        <div className="slider-container">
          {recipes[type]
            .filter((_e, i) => i < SIX)
            .map((recom, i) => (
              <div
                className="item"
                data-testid={ `${i}-recommendation-card` }
                key={ recom[name] }
              >
                <h3 data-testid={ `${i}-recommendation-title` }>{recom[name]}</h3>
                <img className="images" src={ recom[thumb] } alt={ recom[thumb] } />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recomendations;
