import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { readInProgress } from '../services/saveProgressOfRecipes';

function StartButton({ type }) {
  const { id } = useParams();
  const history = useHistory();

  const isStarted = readInProgress()
    ? Object.keys(readInProgress()[type]).some((k) => k === id)
    : undefined;

  const handleClick = () => {
    // addInProgress(id, type);
    history.push(`/${type}/${id}/in-progress`);
  };

  return (
    <Button
      className="button footer-container"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
      variant="warning"
    >
      {isStarted ? 'Continue Recipe' : 'Start Recipe'}
    </Button>
  );
}

StartButton.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default StartButton;
