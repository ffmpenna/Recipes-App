import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [loginInfo, setLoginInfo] = useState({
    inputEmail: '',
    inputPassword: '',
    radioBtn: '',
    searchInput: '',
  });
  const errString = 'Sorry, we haven\'t found any recipes for these filters.';
  const [isDisabled, toggleButton] = useState(true);
  const [foods, setFoods] = useState([]);
  const [drinkz, setDrinkz] = useState([]);
  const [isFilterOn, setFilterOn] = useState(false);
  const [recipes, setRecipes] = useState({ meals: [], drinks: [] });
  const [categories, setCategories] = useState({
    allCategories: [],
    selectedCategory: '',
  });
  const [adviceDrink, setAdviceDrink] = useState({ drink: [] });
  const [adviceMeal, setAdviceMeal] = useState({ meal: [] });

  const validateInputs = useCallback(() => {
    const { inputEmail, inputPassword } = loginInfo;
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const verifyEmail = Regex.test(inputEmail);
    const number = 6;
    const verifyUser = inputPassword.length > number;
    toggleButton(!(verifyEmail && verifyUser));
  }, [loginInfo]);

  const fetchByQuery = async (query, searchInput, page) => {
    let data;
    const linkToFetch = page === 'meals' ? 'themealdb' : 'thecocktaildb';
    if (query === 'first-letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (searchInput.length === 1) {
        data = await fetch(
          `https://www.${linkToFetch}.com/api/json/v1/1/search.php?f=${searchInput}`,
        );
      }
    } else if (query === 'ingredient') {
      data = await fetch(
        `https://www.${linkToFetch}.com/api/json/v1/1/filter.php?i=${searchInput}`,
      );
    } else if (query === 'name') {
      data = await fetch(
        `https://www.${linkToFetch}.com/api/json/v1/1/search.php?s=${searchInput}`,
      );
    }
    if (data && page === 'meals') {
      const meals = await data.json();
      if (meals === null) {
        global.alert(errString);
      }
      return meals;
    }
    if (data && page === 'drinks') {
      const drinks = await data.json();
      if (drinks === null) {
        global.alert(errString);
      }
      return drinks;
    }
  };

  const fetchRecipes = async (page) => {
    let data;
    if (page === 'meals') {
      data = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
    } else if (page === 'drinks') {
      data = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
    }
    setRecipes(await data.json());
  };

  const fetchCategories = useCallback(
    async (page) => {
      let data;
      if (page === 'meals') {
        data = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        );
      } else if (page === 'drinks') {
        data = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        );
      }
      setCategories({ ...categories, allCategories: await data.json() });
    },
    [categories],
  );

  const fetchRecipesByCategory = useCallback(async (page, category) => {
    let data;
    if (page === 'meals') {
      data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
    } else if (page === 'drinks') {
      data = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
      );
    }
    setRecipes(await data.json());
  }, []);

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
    return recipe;
  }, []);

  const fetchAdviceByFood = useCallback(
    async (page) => {
      let data;
      if (page === 'meals') {
        data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setAdviceDrink({ drink: await data.json() });
      } else if (page === 'drinks') {
        data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setAdviceMeal({ meal: await data.json() });
      }
    },
  );

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
      drinkz,
      foods,
      recipes,
      isFilterOn,
      categories,
      adviceDrink,
      adviceMeal,
      setCategories,
      handleChange,
      setFoods,
      setDrinkz,
      setAdviceDrink,
      setAdviceMeal,
      submitLogin,
      fetchByQuery,
      fetchRecipes,
      fetchCategories,
      fetchRecipesByCategory,
      fetchRecipeById,
      fetchAdviceByFood,
      setRecipes,
      setFilterOn,
    }),
    [
      categories,
      isDisabled,
      loginInfo,
      drinkz,
      foods,
      recipes,
      isFilterOn,
      adviceDrink,
      adviceMeal,
      setFilterOn,
      setAdviceDrink,
      setAdviceMeal,
      handleChange,
      submitLogin,
      setCategories,
      fetchCategories,
      fetchRecipesByCategory,
      fetchRecipeById,
      fetchAdviceByFood,
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
