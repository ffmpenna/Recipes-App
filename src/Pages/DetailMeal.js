// import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import '../App.css';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function DetailMeal() {
  const { id } = useParams();
  const {
    location: { pathname },
  } = useHistory();
  const { fetchRecipeById, fetchRecipes, recipes } = useContext(MyContext);
  const [detailMeal, setDetailMeal] = useState({ meals: [] });
  const [isRedirect, setIsRedirect] = useState(false);
  const [isCopied, setCopy] = useState(false);
  const SIX = 6;

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, []);

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
      <p
        key={ `ingredient_${i}` }
        data-testid={ `${i}-ingredient-name-and-measure` }
      >
        {measure !== '' && `${measure[i]} ${ingredient}`}
      </p>
    ));

    return ingredientsList;
  };

  const handleRedirect = () => {
    setIsRedirect(true);
  };

  useEffect(() => {
    const copyBtn = document.getElementById('copyBtn');
    const url = `http://localhost:3000${pathname}`;
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copy(url);
        setCopy(true);
        global.alert('Link copiado!');
      });
    }
  }, [meal, pathname]);

  const favoriteFunction = () => {
    const {
      idDrink,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    } = meal;
    console.log(
      meal,
    );
  };

  return (
    <div>
      {meal ? (
        <div>
          <h2 data-testid="recipe-title">
            {meal.strMeal}
            <span>
              <button
                type="button"
                id="favoriteBtn"
                src={ whiteHeartIcon }
                data-testid="favorite-btn"
                onClick={ favoriteFunction }
              >
                <img src={ whiteHeartIcon } alt="favorite-icon" />
              </button>
              <button
                type="button"
                id="copyBtn"
                src={ shareIcon }
                data-testid="share-btn"
              >
                <img src={ shareIcon } alt="share-icon" />
              </button>
            </span>
            {isCopied && <span>Link copied!</span>}
          </h2>
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
          {recipes.drinks && (
            <div>
              <h1 className="header">Recomendações</h1>
              <div className="horizontal-slider">
                <div className="slider-container">
                  {recipes.drinks
                    .filter((_e, i) => i < SIX)
                    .map((recom, i) => (
                      <div
                        className="item"
                        data-testid={ `${i}-recommendation-card` }
                        key={ recom.strDrink }
                      >
                        <h3 data-testid={ `${i}-recommendation-title` }>
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
              <button
                onClick={ handleRedirect }
                data-testid="start-recipe-btn"
                className="button footer-container"
                type="button"
              >
                Start Recipe
              </button>
            </div>
          )}
          {isRedirect && <Redirect to={ `/meals/${id}/in-progress` } />}
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

// DetailMeal.propTypes = {};

export default DetailMeal;
