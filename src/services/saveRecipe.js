export const saveFavorites = (recipe) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
};

export const readFavorites = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

export const addRecipe = (recipe) => {
  if (recipe) {
    const favoriteRecipes = readFavorites();
    saveFavorites([...favoriteRecipes, recipe]);
  }
};

export const removeRecipe = (recipe) => {
  const favoriteRecipes = readFavorites();
  saveFavorites(favoriteRecipes.filter((e) => e.id !== recipe.id));
};
