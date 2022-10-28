// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import '../App.css';

function DetailMeal(meals) {
  const { fetchRecipeById, fetchAdviceByFood, adviceDrink } = useContext(MyContext);
  const [detailMeal, setDetailMeal] = useState({ meals: [] });
  const { match } = meals;
  const { params } = match;
  const { id } = params;
  const magicNumber = 6;

  useEffect(() => {
    async function fetchMyAPI() {
      setDetailMeal(await fetchRecipeById('meals', id));
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    async function fetchMyAdviceAPI() {
      await fetchAdviceByFood('meals');
    }
    console.log(adviceDrink);
    fetchMyAdviceAPI();
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
      <p key={ `ingredient_${i}` } data-testid={ `${i}-ingredient-name-and-measure` }>
        { measure !== '' && `${measure[i]} ${ingredient}`}
      </p>
    ));

    return ingredientsList;
  };

  return (
    <div>
      {meal ? (
        <div>
          <h2 data-testid="recipe-title">{meal.strMeal}</h2>
          <img
            data-testid="recipe-photo"
            height="325"
            width="425"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
          <p data-testid="recipe-category">{meal.strCategory}</p>
          <p data-testid="instructions">{meal.strInstructions}</p>
          <iframe
            data-testid="video"
            title={ meal.strMeal }
            src={ meal.strYoutube }
          >
            Video
          </iframe>
          {loadIngredients()}
          <h1 className="header">Recomendações</h1>
          <div className="horizontal-slider">
            <div className="slider-container">
              { adviceDrink.drink.drinks.splice(0, magicNumber).map((recom, i) => (
                <div
                  className="item"
                  data-testid={ `${i}-recommendation-card` }
                  key={ recom.strDrink }
                >
                  <h3
                    data-testid={ `${i}-recommendation-title` }
                  >
                    {recom.strDrink}
                  </h3>
                  <img
                    className="images"
                    src={ recom.strDrinkThumb }
                    alt={ recom.strDrink }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailMeal.propTypes = {};

export default DetailMeal;
