import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DetailDrink from './Pages/DetailDrink';
import DetailMeal from './Pages/DetailMeal';
import DoneRecipes from './Pages/DoneRecipes';
import DrinkInProgress from './Pages/DrinkInProgress';
import Drinks from './Pages/Drinks';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import MealInProgress from './Pages/MealInProgress';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DetailDrink } />
      <Route exact path="/meals/:id" component={ DetailMeal } />
      <Route path="/meals/:id/in-progress" component={ MealInProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
