import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, Container, Stack } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ShareAndFavoriteBtn from './shareAndFavBtn';

export default function FavCard(props) {
  const {
    index,
    img,
    name,
    category,
    type,
    nationality,
    id,
    alcoholicOrNot,
    recipe,
  } = props;

  const [isHidden, setHide] = useState(false);
  const history = useHistory();

  const hideCard = () => {
    setHide(true);
  };

  return (
    <Container className="mt-3 d-flex flex-column align-items-center">
      {!isHidden && (
        <Card data-testid={ `${index}-recipe-card` } style={ { width: '18rem' } }>
          <Card.Title
            className="p-2 d-flex justify-content-around align-items-center"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
            <ShareAndFavoriteBtn
              recipes={ recipe }
              page="favoriteRecipes"
              testId={ [
                `${index}-horizontal-favorite-btn`,
                `${index}-horizontal-share-btn`,
              ] }
              hideCard={ hideCard }
            />
          </Card.Title>
          <Card.Img
            link={ `/meals/${index}` }
            height="200"
            width="200"
            src={ img }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            onClick={ () => history.push(`/${type}s/${id}`) }
          />
          <Card.Body>
            <Card.Text>
              <h6 className="p-2" data-testid={ `${index}-horizontal-top-text` }>
                {type === 'meal'
                  ? `${nationality} - ${category} `
                  : `${category} - ${alcoholicOrNot}`}
              </h6>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

FavCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
