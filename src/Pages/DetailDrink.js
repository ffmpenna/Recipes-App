import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
// import PropTypes from 'prop-types'

function DetailDrink(prop) {
  const { fetchRecipes, recipes } = useContext(MyContext);
  const { match } = prop;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    async function fetchMyAPI() {
      await fetchRecipes('drinks');
    }
    fetchMyAPI();
  }, []);

  const renderFoods = (f) => {
    const bebida = [...recipes.drinks.filter((e) => e.idDrink === f)];
    return bebida;
  };

  const drink = renderFoods(id);
  return (
    <div>
      {drink[0] ? (
        <div>
          <h2>{drink[0].strDrink}</h2>
          <img
            height="325"
            width="425"
            src={ drink[0].strDrinkThumb }
            alt={ drink[0].strDrink }
          />
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailDrink.propTypes = {}

export default DetailDrink;
