// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function DetailMeal(meal) {
  const { foods } = useContext(MyContext);
  const { match } = meal;
  const { params } = match;
  const { id } = params;

  const renderFoods = (f) => {
    const food = [...foods.filter((e) => e.idMeal === f)];
    return food;
  };

  const prato = renderFoods(id);
  return (
    <div>
      DetailMeal
      <div>
        <h2>{prato[0].strMeal}</h2>
        <img
          height="325"
          width="425"
          src={ prato[0].strMealThumb }
          alt={ prato[0].strMeal }
        />
      </div>
    </div>
  );
}

// DetailMeal.propTypes = {};

export default DetailMeal;
