import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';

function Recipes({ page }) {
  const {
    recipes,
    categories,
    setCategories,
    fetchRecipes,
    fetchRecipesByCategory,
  } = useContext(MyContext);

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, [page]);

  const MAX_DISPLAY = 12;
  const LENGTH = 5;

  const displayCards = (array, type, quantity) => {
    const attributes = {
      id: type === 'meals' ? 'idMeal' : 'idDrink',
      name: type === 'meals' ? 'strMeal' : 'strDrink',
      thumb: type === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
      instructions: 'strInstructions',
    };

    console.log(array);

    const { name, thumb, id, instructions } = attributes;

    return array
      .filter((_e, i) => i < quantity)
      .map((recipe, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          name={ recipe[name] }
          img={ recipe[thumb] }
          type={ type }
          id={ recipe[id] }
          instructions={ recipe[instructions] }
        />
      ));
  };
  const selectCategory = async ({ target }) => {
    const { value } = target;
    await setCategories({ ...categories, selectedCategory: value });
    if (value !== categories.selectedCategory) {
      fetchRecipesByCategory(page, value);
    } else {
      setCategories({ ...categories, selectedCategory: '' });
      fetchRecipesByCategory(page, 'all');
    }
  };

  return (
    <Container className="container">
      <h3 className="h6">Categories</h3>
      <Form className="d-flex flex-wrap mm-3">
        {categories.allCategories[page]
          && categories.allCategories[page]
            .filter((_e, i) => i < LENGTH)
            .map((category, index) => (
              <div key={ index }>
                <Form.Check
                  inline
                  label={ category.strCategory }
                  data-testid={ `${category.strCategory}-category-filter` }
                  type="radio"
                  id={ `${category}${index}` }
                  name="category"
                  value={ category.strCategory }
                  onClick={ selectCategory }
                />
              </div>
            ))}
        <Form.Check
          inline
          label="All"
          data-testid="All-category-filter"
          type="radio"
          id="all"
          name="category"
          value="all"
          onClick={ selectCategory }
        />
      </Form>
      <div className="d-flex flex-column align-items-center">
        <h1 className="h1 mt-3 mb-3">Recipes</h1>
        {recipes.meals && page === 'meals' ? (
          <div>{displayCards(recipes.meals, 'meals', MAX_DISPLAY)}</div>
        ) : (
          <div>{displayCards(recipes.drinks, 'drinks', MAX_DISPLAY)}</div>
        )}
      </div>
    </Container>
  );
}

Recipes.propTypes = {
  pages: PropTypes.string,
}.isRequired;

export default Recipes;
