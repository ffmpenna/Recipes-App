// import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function DetailMeal(meal) {
  const { fetchRecipes, recipes } = useContext(MyContext);
  const { match } = meal;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    async function fetchMyAPI() {
      await fetchRecipes('meals');
    }
    fetchMyAPI();
  }, []);

  const renderFoods = (f) => {
    if (recipes.meals) {
      const food = [...recipes.meals.filter((e) => e.idMeal === f)];

      return food;
    }
  };

  const prato = renderFoods(id);

  return (
    <div>
      {prato[0] ? (
        <div>
          <h2>{prato[0].strMeal}</h2>
          <img
            height="325"
            width="425"
            src={ prato[0].strMealThumb }
            alt={ prato[0].strMeal }
          />
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailMeal.propTypes = {};

export default DetailMeal;
