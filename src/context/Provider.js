import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [loginInfo, setLoginInfo] = useState({
    inputEmail: '',
    inputPassword: '',
    radioBtn: '',
    searchInput: '',
    favoriteFilter: 'all',
    doneFilter: 'all',
  });
  const errString = 'Sorry, we haven\'t found any recipes for these filters.';
  const [isDisabled, toggleButton] = useState(true);
  const [isFilterOn, setFilterOn] = useState(false);
  const [recipes, setRecipes] = useState({ meals: [], drinks: [] });
  const [categories, setCategories] = useState({
    allCategories: {},
    selectedCategory: '',
  });
  const [isFinished, setFinished] = useState(false);

  const validateInputs = useCallback(() => {
    const { inputEmail, inputPassword } = loginInfo;
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const verifyEmail = Regex.test(inputEmail);
    const number = 6;
    const verifyUser = inputPassword.length > number;
    toggleButton(!(verifyEmail && verifyUser));
  }, [loginInfo]);

  const fetchRecipes = async () => {
    const mealsResponse = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    const drinksResponse = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    const data = [await mealsResponse.json(), await drinksResponse.json()];
    setRecipes({
      meals: data[0].meals,
      drinks: data[1].drinks,
    });
    setFilterOn(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, []);

  const fetchByQuery = useCallback(
    async (query, searchInput, page, history) => {
      let data;
      const linkToFetch = page === 'meals' ? 'themealdb' : 'thecocktaildb';
      if (query === 'first-letter') {
        if (searchInput.length !== 1) {
          global.alert('Your search must have only 1 (one) character');
          data = { [page]: null };
        } else if (searchInput.length === 1) {
          const response = await fetch(
            `https://www.${linkToFetch}.com/api/json/v1/1/search.php?f=${searchInput}`,
          );
          data = await response.json();
          console.log(data);
        }
      } else if (query === 'ingredient') {
        const response = await fetch(
          `https://www.${linkToFetch}.com/api/json/v1/1/filter.php?i=${searchInput}`,
        );
        data = await response.json();
      } else if (query === 'name') {
        const response = await fetch(
          `https://www.${linkToFetch}.com/api/json/v1/1/search.php?s=${searchInput}`,
        );
        data = await response.json();
      }
      if (data[page] === null) {
        global.alert(errString);
      } else if (page === 'meals' && data[page].length === 1) {
        console.log(data[page]);
        history.push(`/meals/${data[page][0].idMeal}`);
      } else if (page === 'drinks' && data[page].length === 1) {
        history.push(`/drinks/${data[page][0].idDrink}`);
      } else {
        setRecipes({ ...recipes, [page]: data[page] });
      }
    },
    [],
  );

  useEffect(() => {
    async function fetchData() {
      const mealCategoryResponse = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );

      const drinkCategoryResponse = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );

      const data = [
        await mealCategoryResponse.json(),
        await drinkCategoryResponse.json(),
      ];

      setCategories({
        ...categories,
        allCategories: { meals: data[0].meals, drinks: data[1].drinks },
      });
    }
    fetchData();
  }, []);

  const fetchRecipesByCategory = useCallback(
    async (page, category) => {
      if (category === 'all') {
        return fetchRecipes();
      }

      let link;

      if (page === 'meals') {
        link = 'themealdb';
      } else {
        link = 'thecocktaildb';
      }

      const response = await fetch(
        `https://www.${link}.com/api/json/v1/1/filter.php?c=${category}`,
      );
      const data = await response.json();
      setRecipes({ ...recipes, [page]: data[page] });
    },
    [recipes],
  );

  const fetchRecipeById = useCallback(async (page, id) => {
    let data;
    if (page === 'meals') {
      data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
    } else if (page === 'drinks') {
      data = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
    }
    const recipe = await data.json();
    return recipe[page][0];
  }, []);

  useEffect(() => {
    const favoriteStorage = localStorage.getItem('favoriteRecipes');
    if (!favoriteStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const doneStorage = localStorage.getItem('doneRecipes');
    if (!doneStorage) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  const handleChange = useCallback(
    ({ target }) => {
      const auxValues = { ...loginInfo };
      auxValues[target.name] = target.value;
      setLoginInfo(auxValues);
    },
    [loginInfo],
  );

  const submitLogin = useCallback(() => {
    const { inputEmail } = loginInfo;
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
  }, [loginInfo]);

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  const contextValue = useMemo(
    () => ({
      isDisabled,
      loginInfo,
      recipes,
      isFilterOn,
      categories,
      isFinished,
      fetchRecipes,
      setCategories,
      handleChange,
      submitLogin,
      fetchByQuery,
      fetchRecipesByCategory,
      fetchRecipeById,
      setRecipes,
      setFilterOn,
      setFinished,
    }),
    [
      categories,
      isDisabled,
      loginInfo,
      recipes,
      isFilterOn,
      isFinished,
      setFilterOn,
      handleChange,
      submitLogin,
      setCategories,
      fetchRecipesByCategory,
      fetchRecipeById,
      fetchByQuery,
    ],
  );

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default Provider;
