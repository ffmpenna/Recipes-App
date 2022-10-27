// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function DetailMeal(meals) {
  const { fetchRecipeById } = useContext(MyContext);
  const [detailMeal, setDetailMeal] = useState({ meals: [] });
  const { match } = meals;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    async function fetchMyAPI() {
      setDetailMeal(await fetchRecipeById('meals', id));
    }
    fetchMyAPI();
  }, []);

  const meal = detailMeal.meals[0];

  const loadIngredients = () => {
    const ingredients = Object.keys(meal)
      .filter((k) => k.match('strIngredient'))
      .map((e) => meal[e]);

    const measure = Object.keys(meal)
      .filter((k) => k.match('strMeasure'))
      .map((e) => meal[e]);

    const ingredientsList = ingredients.map((ingredient, i) => (
      <p key={ `igredient_${i}` }>{`${measure[i]} ${ingredient}`}</p>
    ));

    return ingredientsList;
  };

  return (
    <div>
      {meal ? (
        <div>
          <h2>{meal.strMeal}</h2>
          <img
            height="325"
            width="425"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
          <p>{meal.strInstructions}</p>
          {loadIngredients()}
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailMeal.propTypes = {};

export default DetailMeal;
