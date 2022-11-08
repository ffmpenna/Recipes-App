import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import MyContext from '../context/MyContext';

function CardsFilter({ type }) {
  const { handleChange } = useContext(MyContext);
  return (
    <Form className="text-center">
      <Form.Check
        inline
        label="Drinks"
        data-testid="filter-by-drink-btn"
        type="radio"
        value="drink"
        id="drinks"
        name={ type === 'favorite' ? 'favoriteFilter' : 'doneFilter' }
        onChange={ handleChange }
      />

      <Form.Check
        inline
        label="Meals"
        data-testid="filter-by-meal-btn"
        name={ type === 'favorite' ? 'favoriteFilter' : 'doneFilter' }
        value="meal"
        id="meals"
        type="radio"
        onChange={ handleChange }
      />

      <Form.Check
        inline
        label="All"
        name={ type === 'favorite' ? 'favoriteFilter' : 'doneFilter' }
        value="all"
        id="all"
        data-testid="filter-by-all-btn"
        type="radio"
        onChange={ handleChange }
      />
    </Form>
  );
}

CardsFilter.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CardsFilter;
