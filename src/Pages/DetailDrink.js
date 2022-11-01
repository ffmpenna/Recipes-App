import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import '../App.css';
import ShareAndFavoriteBtn from '../Components/shareAndFavBtn';
import MyContext from '../context/MyContext';
// import PropTypes from 'prop-types'

function DetailDrink() {
  const { id } = useParams();
  const { fetchRecipeById, fetchRecipes, recipes } = useContext(MyContext);
  const [detailDrink, setDetailDrink] = useState({ drinks: [] });
  const [isRedirectDrink, setIsRedirectDrink] = useState(false);
  const SIX = 6;

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      setDetailDrink(await fetchRecipeById('drinks', id));
    }
    fetchMyAPI();
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
        {measure !== '' && `${measure[i]} - ${ingredient}`}
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

  const handleRedirectDrink = () => {
    setIsRedirectDrink(true);
  };

  return (
    <div>
      {drink ? (
        <div>
          <h2 data-testid="recipe-title">
            {drink.strDrink}
            <span>
              <ShareAndFavoriteBtn
                recipes={ drink }
                testId={ ['share-btn', 'favorite-btn'] }
              />
            </span>
          </h2>
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
          {recipes.meals && (
            <div>
              <h1 className="header">Recomendações</h1>
              <div className="horizontal-slider">
                <div className="slider-container">
                  {recipes.meals
                    .filter((_e, i) => i < SIX)
                    .map((recomend, i) => (
                      <div
                        className="item"
                        data-testid={ `${i}-recommendation-card` }
                        key={ recomend.strMeal }
                      >
                        <h3 data-testid={ `${i}-recommendation-title` }>
                          {recomend.strMeal}
                        </h3>
                        <img
                          className="images"
                          src={ recomend.strMealThumb }
                          alt={ recomend.strMeal }
                        />
                      </div>
                    ))}
                </div>
              </div>
              <button
                onClick={ handleRedirectDrink }
                data-testid="start-recipe-btn"
                className="button footer-container"
                type="button"
              >
                Start Recipe
              </button>
            </div>
          )}
          {isRedirectDrink && <Redirect to={ `${id}/in-progress` } />}
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailDrink.propTypes = {}

export default DetailDrink;
