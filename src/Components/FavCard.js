import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
    <div>
      {!isHidden && (
        <section data-testid={ `${index}-recipe-card` }>
          <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <img
              link={ `/meals/${index}` }
              height="200"
              width="200"
              src={ img }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {type === 'meal'
              ? `${nationality} - ${category} `
              : `${category} - ${alcoholicOrNot}`}

            <span>
              <ShareAndFavoriteBtn
                recipes={ recipe }
                page="favoriteRecipes"
                testId={ [
                  `${index}-horizontal-favorite-btn`,
                  `${index}-horizontal-share-btn`,
                ] }
                hideCard={ hideCard }
              />
            </span>
          </p>
        </section>
      )}
    </div>
  );
}

FavCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
