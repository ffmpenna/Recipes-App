import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import MyContext from '../context/MyContext';

export default function SearchBar({ page }) {
  const {
    fetchByQuery, handleChange,
    loginInfo, setFoods,
    setDrinkz, setFilterOn,
  } = useContext(MyContext);

  const onBtnClick = async () => {
    const { radioBtn, searchInput } = loginInfo;
    const results = await fetchByQuery(radioBtn, searchInput, page);
    const doze = 12;
    if (results) {
      const { meals } = results;
      const { drinks } = results;
      setFilterOn(true);
      if (meals && page === 'meals') {
        const dozeReceitas = meals.slice(0, doze);
        setFoods(dozeReceitas);
      } else if (drinks && page === 'drinks') {
        const dozeReceitas = drinks.slice(0, doze);
        setDrinkz(dozeReceitas);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setFilterOn(false);
      }
    }
  };

  return (
    <div>
      <label htmlFor="radioBtn">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          name="radioBtn"
          onChange={ handleChange }
        />
        Ingredientes
      </label>
      <label htmlFor="radioBtn">
        <input
          data-testid="name-search-radio"
          name="radioBtn"
          value="name"
          type="radio"
          onChange={ handleChange }
        />
        Nome
      </label>
      <label htmlFor="radioBtn">
        <input
          name="radioBtn"
          value="first-letter"
          data-testid="first-letter-search-radio"
          type="radio"
          onChange={ handleChange }
        />
        Primeira Letra
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ onBtnClick }>
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};
