import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
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
    <Container
      style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }
    >
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
          <h5 className="h5" data-testid="recipe-category">
            {`Category: ${detailRecipe[category]}`}
          </h5>
          {type === 'meals' && page !== 'in-progress' && (
            <RecipeVideo type={ type } recipe={ detailRecipe } />
          )}
          <h3 className="h2">Instructions</h3>
          <p data-testid="instructions">{detailRecipe[instructions]}</p>
          {}
          <h3 className="h2">Ingredients</h3>
          {page === 'in-progress' ? (
            <div>
              <CheckIngredientList recipe={ detailRecipe } type={ type } />
              <Navbar
                fixed="bottom"
                className="nav-bar d-flex justify-content-center"
              >
                <FinishButton type={ type } recipe={ detailRecipe } />
              </Navbar>
            </div>
          ) : (
            <div>
              <IngredientList recipe={ detailRecipe } />
              <Navbar
                fixed="bottom"
                className="nav-bar d-flex justify-content-center"
              >
                <StartButton type={ type } />
              </Navbar>
            </div>
          )}
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </Container>
  );
}

DetailRecipe.propTypes = {
  type: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default DetailRecipe;
