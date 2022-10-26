import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, withoutSearch }) {
  const [isSearchInputShown, toggleSearchInput] = useState(false);
  const { handleChange } = useContext(MyContext);

  return (
    <div className="header-container">
      <header className="header-content">
        <Link to="/profile">
          <button data-testid="profile-top-btn" type="button" src={ profileIcon }>
            <img src={ profileIcon } alt="profile-icon" />
          </button>
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <div>
          {isSearchInputShown && (
            <input
              type="text"
              placeholder="Pesquise aqui"
              data-testid="search-input"
              name="searchInput"
              onChange={ handleChange }
            />
          )}
          {!withoutSearch && (
            <button
              data-testid="search-top-btn"
              type="button"
              src={ searchIcon }
              onClick={ () => toggleSearchInput(!isSearchInputShown) }
            >
              <img src={ searchIcon } alt="search-icon" />
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
