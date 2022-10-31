import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import MyContext from '../context/MyContext';

export default function SearchBar({ page }) {
  const history = useHistory();
  const { fetchByQuery, handleChange, loginInfo } = useContext(MyContext);

  const onBtnClick = async () => {
    const { radioBtn, searchInput } = loginInfo;
    await fetchByQuery(radioBtn, searchInput, page, history);
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
