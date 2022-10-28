// import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from './Footer';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  const redirectTo = (endpoint) => {
    if (endpoint === 'logout') {
      localStorage.clear();
      return history.push('/');
    }
    history.push(endpoint);
  };

  return (
    <div>
      <Header title="Profile" withoutSearch />
      {user && <p data-testid="profile-email">{user.email}</p>}
      <button
        type="button"
        onClick={ () => redirectTo('done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        onClick={ () => redirectTo('favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        onClick={ () => redirectTo('logout') }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
