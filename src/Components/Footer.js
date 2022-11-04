import React, { useState } from 'react';
import { Button, Navbar, Stack } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

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
    <Navbar className="nav-bar" fixed="bottom">
      <div className="clear" />
      <Stack className="mx-auto" direction="horizontal" gap={ 2 }>
        <Button
          onClick={ redirectDrink }
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          variant="warning"
        >
          <img src={ drinkIcon } alt="drink-icon" />
        </Button>
        <Button
          onClick={ redirectMeal }
          type="button"
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          variant="warning"
        >
          <img src={ mealIcon } alt="meal-icon" />
        </Button>
        {redirectDrinks && <Redirect to="/drinks" />}
        {redirectMeals && <Redirect to="/meals" />}
      </Stack>
    </Navbar>
  );
}

export default Footer;
