import React, { useContext } from 'react';
import CardsFilter from '../Components/CardsFilter';
import DoneCard from '../Components/DoneCard';
import Header from '../Components/Header';
import MyContext from '../context/MyContext';
import { readDone } from '../services/saveProgressOfRecipes';
// import PropTypes from 'prop-types'

function DoneRecipes() {
  const { loginInfo } = useContext(MyContext);
  const doneRecipes = readDone();

  return (
    <div className="with-header">
      <Header title="Done Recipes" withoutSearch />
      <CardsFilter type="done" />
      {doneRecipes
        && doneRecipes
          .filter(
            (e) => e.type === loginInfo.doneFilter || loginInfo.doneFilter === 'all',
          )
          .map((r, i) => (
            <DoneCard recipe={ r } index={ i } key={ `${r.id}_${i}` } />
          ))}
    </div>
  );
}

// DoneRecipes.propTypes = {}

export default DoneRecipes;
