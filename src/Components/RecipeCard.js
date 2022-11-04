import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function RecipeCard(props) {
  const { index, img, name, id, type, instructions } = props;
  const history = useHistory();
  return (
    <Card
      className="mb-5"
      data-testid={ `${index}-recipe-card` }
      style={ { width: '18rem' } }
    >
      <Card.Img
        variant="top"
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>{name}</Card.Title>
        <Card.Text>
          {instructions
            ? `${instructions.slice(0, 100)}...`
            : 'Click in the button below to view full recipe instructions'}
        </Card.Text>
        <Button
          type="button"
          data-testid="product-detail-link"
          onClick={ () => history.push(`/${type}/${id}`) }
        >
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
