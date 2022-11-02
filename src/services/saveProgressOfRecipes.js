export const saveInProgress = (recipe) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));
};

export const readInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

export const addInProgress = (recipeId, type) => {
  if (recipeId) {
    const inProgressRecipes = readInProgress();
    console.log(inProgressRecipes);
    saveInProgress({
      ...inProgressRecipes,
      [type]: { ...inProgressRecipes[type], [recipeId]: [] },
    });
  }
};

export const addUsedIngridient = (recipeId, type, ingredient) => {
  if (recipeId) {
    const inProgressRecipes = readInProgress();
    saveInProgress({
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [recipeId]: [...inProgressRecipes[type][recipeId], ingredient],
      },
    });
  }
};

export const removeUsedIngridient = (recipeId, type, ingredient) => {
  const inProgressRecipes = readInProgress();
  saveInProgress({
    ...inProgressRecipes,
    [type]: {
      ...inProgressRecipes[type],
      [recipeId]: inProgressRecipes[type][recipeId].filter(
        (e) => e !== ingredient,
      ),
    },
  });
};

export const saveDone = (recipe) => {
  localStorage.setItem('doneRecipes', JSON.stringify(recipe));
};

export const readDone = () => JSON.parse(localStorage.getItem('doneRecipes'));

export const addDone = (recipe) => {
  if (recipe) {
    const doneRecipes = readDone();
    saveDone([...doneRecipes, recipe]);
  }
};
