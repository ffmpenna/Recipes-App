import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
// import PropTypes from 'prop-types'

function DetailDrink(prop) {
  const { drinkz } = useContext(MyContext);
  const { match } = prop;
  const { params } = match;
  const { id } = params;

  const renderFoods = (f) => {
    const bebida = [...drinkz.filter((e) => e.idDrink === f)];
    return bebida;
  };

  const drink = renderFoods(id);
  return (
    <div>
      DetailDrink
      <div>
        <h2>{drink[0].strDrink}</h2>
        <img
          height="325"
          width="425"
          src={ drink[0].strDrinkThumb }
          alt={ drink[0].strDrink }
        />
      </div>
    </div>
  );
}

// DetailDrink.propTypes = {}

export default DetailDrink;
