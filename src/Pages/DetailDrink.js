import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
// import PropTypes from 'prop-types'

function DetailDrink(prop) {
  const { fetchRecipeById, adviceRecibeByFood } = useContext(MyContext);
  const [detailDrink, setDetailDrink] = useState({ drinks: [] });
  const [/* adviceMeal */, setAdviceMeal] = useState({ meal: [] });
  const { match } = prop;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    async function fetchMyAPI() {
      setDetailDrink(await fetchRecipeById('drinks', id));
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    async function fetchMyAPI2() {
      setAdviceMeal(await adviceRecibeByFood('drinks'));
    }
    fetchMyAPI2();
  }, []);

  const drink = detailDrink.drinks[0];

  const loadIngredients = () => {
    const ingredients = Object.entries(drink)
      .filter((k) => k[0].includes('strIngredient') && k[1] !== null)
      .map((e) => drink[e[0]]);

    const measure = Object.entries(drink)
      .filter((k) => k[0].includes('strMeasure') && k[1] !== null)
      .map((e) => drink[e[0]]);

    const ingredientsList = ingredients.map((ingredient, i) => (measure[i] ? (
      <p
        data-testid={ `${i}-ingredient-name-and-measure` }
        key={ `ingredient_${i}` }
      >
        {`${measure[i]} - ${ingredient}`}
      </p>
    ) : (
      <p
        data-testid={ `${i}-ingredient-name-and-measure` }
        key={ `ingredient_${i}` }
      >
        {`${ingredient}`}
      </p>
    )));

    return ingredientsList;
  };

  return (
    <div>
      {drink ? (
        <div>
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>
          <img
            data-testid="recipe-photo"
            height="325"
            width="425"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          <p data-testid="instructions">{drink.strInstructions}</p>
          {loadIngredients()}
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailDrink.propTypes = {}

export default DetailDrink;
