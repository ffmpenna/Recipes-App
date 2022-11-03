import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DoneCard from '../Components/DoneCard';
import Header from '../Components/Header';
import MyContext from '../context/MyContext';
import { readDone } from '../services/saveProgressOfRecipes';
// import PropTypes from 'prop-types'

function DoneRecipes() {
  const history = useHistory();
  const { handleChange, loginInfo } = useContext(MyContext);
  const doneRecipes = readDone();

  console.log(history.location.pathname);

  return (
    <div>
      <Header title="Done Recipes" withoutSearch />
      <div>
        <label htmlFor="drinks">
          <input
            data-testid="filter-by-drink-btn"
            type="radio"
            value="drink"
            id="drinks"
            name="doneFilter"
            onChange={ handleChange }
          />
          Drinks
        </label>
        <label htmlFor="meals">
          <input
            data-testid="filter-by-meal-btn"
            name="doneFilter"
            value="meal"
            id="meals"
            type="radio"
            onChange={ handleChange }
          />
          Meals
        </label>
        <label htmlFor="all">
          <input
            name="doneFilter"
            value="all"
            id="all"
            data-testid="filter-by-all-btn"
            type="radio"
            onChange={ handleChange }
          />
          All
        </label>
      </div>
      {doneRecipes
        && doneRecipes
          .filter(
            (e) => e.type === loginInfo.doneFilter
              || loginInfo.doneFilter === 'all',
          )
          .map((r, i) => (
            <DoneCard
              recipe={ r }
              index={ i }
              key={ `${r.id}_${i}` }
            />
          ))}
    </div>
  );
}

// DoneRecipes.propTypes = {}

export default DoneRecipes;
