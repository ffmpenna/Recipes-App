import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import MyContext from '../context/MyContext';
import CheckIngredientList from './CheckIngredientList';
import FinishButton from './FinishButton';
import IngredientList from './IngredientList';
import RecipeVideo from './RecipeVideo';
import ShareAndFavoriteBtn from './shareAndFavBtn';
import StartButton from './StartButton';

function DetailRecipe({ type, page }) {
  const { id } = useParams();
  const { fetchRecipeById, fetchRecipes } = useContext(MyContext);
  const [detailRecipe, setDetailRecipe] = useState({ [type]: [] });

  const attributes = {
    name: type === 'meals' ? 'strMeal' : 'strDrink',
    thumb: type === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
    instructions: 'strInstructions',
    category: type === 'meals' ? 'strCategory' : 'strAlcoholic',
  };

  const { name, category, thumb, instructions } = attributes;

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      setDetailRecipe(await fetchRecipeById(type, id));
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
      {detailRecipe ? (
        <div>
          <h2 data-testid="recipe-title">
            {detailRecipe[name]}
            <span>
              <ShareAndFavoriteBtn
                recipes={ detailRecipe }
                type={ type }
                testId={ ['favorite-btn', 'share-btn'] }
              />
            </span>
          </h2>
          <img
            data-testid="recipe-photo"
            height="325"
            width="425"
            src={ detailRecipe[thumb] }
            alt={ detailRecipe[name] }
          />
          <p data-testid="recipe-category">{detailRecipe[category]}</p>
          {(type === 'meals' && page !== 'in-progress') && (
            <RecipeVideo type={ type } recipe={ detailRecipe } />
          )}
          <p data-testid="instructions">{detailRecipe[instructions]}</p>
          {}

          {page === 'in-progress' ? (
            <div>
              <CheckIngredientList recipe={ detailRecipe } type={ type } />
              <div className="clear" />
              <FinishButton type={ type } recipe={ detailRecipe } />
            </div>
          ) : (
            <div>
              <IngredientList recipe={ detailRecipe } />
              <div className="clear" />
              <StartButton type={ type } />
            </div>
          )}
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}

DetailRecipe.propTypes = {
  type: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default DetailRecipe;
