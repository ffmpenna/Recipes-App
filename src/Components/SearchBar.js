import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
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
    <Container className="mt-4 container">
      <h2 className="h6">Search Filters</h2>
      <Form>
        <Form.Check
          inline
          htmlFor="searchFilterIngredients"
          data-testid="ingredient-search-radio"
          type="radio"
          id="searchFilterIngredients"
          value="ingredient"
          name="radioBtn"
          onChange={ handleChange }
          label="ingredients"
        />
        <Form.Check
          inline
          htmlFor="searchFilterName"
          data-testid="name-search-radio"
          id="searchFilterName"
          name="radioBtn"
          value="name"
          type="radio"
          onChange={ handleChange }
          label="name"
        />
        <Form.Check
          inline
          htmlFor="searchFilterLetter"
          id="searchFilterLetter"
          name="radioBtn"
          value="first-letter"
          data-testid="first-letter-search-radio"
          type="radio"
          onChange={ handleChange }
          label="first-letter"
        />
        <Button
          variant="warning"
          type="button"
          data-testid="exec-search-btn"
          onClick={ onBtnClick }
        >
          Buscar
        </Button>
      </Form>
    </Container>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};
