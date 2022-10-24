import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import Login from './Pages/Login';
import Meals from './Pages/Meals';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
