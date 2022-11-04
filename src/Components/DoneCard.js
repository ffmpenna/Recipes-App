/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ShareAndFavoriteBtn from './shareAndFavBtn';

export default function DoneCard({ recipe, index }) {
  const {
    image,
    name,
    category,
    type,
    nationality,
    id,
    alcoholicOrNot,
    doneDate,
    tags,
  } = recipe;

  const history = useHistory();

  return (
    <Container className="d-flex flex-column align-items-center mt-2">
      <Card data-testid={ `${index}-recipe-card` } style={ { width: '18rem' } }>
        <Card.Title
          className="p-2 d-flex justify-content-around align-items-center"
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
          <ShareAndFavoriteBtn
            recipes={ recipe }
            page="doneRecipes"
            testId={ [
              `${index}-horizontal-favorite-btn`,
              `${index}-horizontal-share-btn`,
            ] }
          />
        </Card.Title>
        <Card.Img
          variant="top"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          onClick={ () => history.push(`/${type}s/${id}`) }
        />
        <Card.Body>
          <h6 className="h5 p" data-testid={ `${index}-horizontal-top-text` }>
            {type === 'meal'
              ? `${nationality} - ${category} `
              : `${category} - ${alcoholicOrNot}`}
          </h6>
          <Card.Text>
            Tags:
            {tags[0] ? (
              tags
                .filter((e) => e !== undefined)
                .map((t, i) => (
                  <span
                    data-testid={ `${index}-${t}-horizontal-tag` }
                    key={ `tag_${i}` }
                  >
                    {` ${t}`}
                  </span>
                ))
            ) : (
              <span> ------- </span>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Recipe done in: ${doneDate}`}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
