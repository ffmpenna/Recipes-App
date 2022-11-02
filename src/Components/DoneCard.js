import PropTypes from 'prop-types';
import React from 'react';
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
    <div>
      <section data-testid={ `${index}-recipe-card` }>
        <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          <img
            link={ `/meals/${index}` }
            height="200"
            width="200"
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </button>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {type === 'meal'
            ? `${nationality} - ${category} `
            : `${category} - ${alcoholicOrNot}`}
        </p>
        <p>
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
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>
          {`Recipe done in: ${doneDate}`}
        </p>

        <ShareAndFavoriteBtn
          recipes={ recipe }
          page="doneRecipes"
          testId={ [
            `${index}-horizontal-favorite-btn`,
            `${index}-horizontal-share-btn`,
          ] }
        />
      </section>
    </div>
  );
}

DoneCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
