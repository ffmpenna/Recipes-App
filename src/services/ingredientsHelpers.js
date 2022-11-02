export const createIngredientsList = (recipe) => {
  const ingredients = Object.entries(recipe)
    .filter((k) => k[0].includes('strIngredient') && k[1] !== null)
    .map((e) => recipe[e[0]]).filter((e) => e !== '');

  const measure = Object.entries(recipe)
    .filter((k) => k[0].includes('strMeasure') && k[1] !== null)
    .map((e) => recipe[e[0]]).filter((e) => e !== '');

  const ingredientsList = ingredients.map((ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-name-and-measure` }
      key={ `ingredient_${i}` }
    >
      {measure[i] && ingredient ? `${measure[i]} - ${ingredient}` : `${ingredient}` }
    </p>
  ));

  return ingredientsList;
};

export const getIngredients = (recipe) => {
  const ingredients = Object.entries(recipe)
    .filter((k) => k[0].includes('strIngredient') && k[1] !== null)
    .map((e) => recipe[e[0]]).filter((e) => e !== '');

  const measure = Object.entries(recipe)
    .filter((k) => k[0].includes('strMeasure') && k[1] !== null)
    .map((e) => recipe[e[0]]).filter((e) => e !== '');

  return { ingredients, measure };
};
