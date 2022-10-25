import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, notSearch }) {
  const [isSearchInputShow, toggleSearchInput] = useState(false);

  return (
    <div>
      <Link to="/profile">
        <button data-testid="profile-top-btn" type="button" src={ profileIcon }>
          <img src={ profileIcon } alt="profile-icon" />
        </button>
      </Link>
      {!notSearch && (
        <button
          data-testid="search-top-btn"
          type="button"
          src={ searchIcon }
          onClick={ () => toggleSearchInput(!isSearchInputShow) }
        >
          <img src={ searchIcon } alt="search-icon" />
        </button>
      )}

      {isSearchInputShow && (
        <input
          type="text"
          placeholder="Pesquise aqui"
          data-testid="search-input"
        />
      )}

      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
