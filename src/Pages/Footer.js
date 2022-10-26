import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../App.css';

function Footer() {
  const [redirectDrinks, setRedirectDrinks] = useState(false);
  const [redirectMeals, setRedirectMeals] = useState(false);

  const redirectDrink = () => {
    setRedirectDrinks(true);
  };

  const redirectMeal = () => {
    setRedirectMeals(true);
  };

  return (
    <footer className="footer" data-testid="footer">
      <button
        onClick={ redirectDrink }
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </button>
      <button
        onClick={ redirectMeal }
        type="button"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal-icon" />
      </button>
      {redirectDrinks && <Redirect to="/drinks" />}
      {redirectMeals && <Redirect to="/meals" />}
    </footer>
  );
}

export default Footer;
