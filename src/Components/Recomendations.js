import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import MyContext from '../context/MyContext';

function Recomendations({ type }) {
  const { fetchRecipes, recipes } = useContext(MyContext);
  const SIX = 6;

  useEffect(() => {
    async function fetchData() {
      await fetchRecipes();
    }
    fetchData();
  }, []);

  const attributes = {
    name: type === 'meals' ? 'strMeal' : 'strDrink',
    thumb: type === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
  };

  const { name, thumb } = attributes;

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } }
    >
      <h1 className="header">Recomendations</h1>
      <Carousel
        className="horizontal-slider carousel"
        style={ { width: '400px' } }
      >
        {shuffle(recipes[type])
          .filter((_e, i) => i < SIX)
          .map((recom, i) => (
            <Carousel.Item
              className="item"
              data-testid={ `${i}-recommendation-card` }
              key={ recom[name] }
            >
              <Carousel.Caption className="carousel-caption">
                <h3 className="h3">{recom[name]}</h3>
              </Carousel.Caption>
              <img
                className="images"
                width="100%"
                src={ recom[thumb] }
                alt={ recom[thumb] }
              />
            </Carousel.Item>
          ))}
      </Carousel>
      <div className="clear" />
    </div>
  );
}

Recomendations.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recomendations;
