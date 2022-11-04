// import PropTypes from 'prop-types';
import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  console.log(history.location.pathname);

  const redirectTo = (endpoint) => {
    if (endpoint === 'logout') {
      localStorage.clear();
      return history.push('/');
    }
    history.push(endpoint);
  };

  return (
    <div className="with-header d-flex flex-column">
      <Header title="Profile" withoutSearch />
      {user && <p className="h3 text-center" data-testid="profile-email">{user.email}</p>}
      <Stack className="d-flex flex-column" direction="horizontal" gap={ 3 }>
        <Button
          type="button"
          onClick={ () => redirectTo('done-recipes') }
          data-testid="profile-done-btn"
          variant="warning"
        >
          Done Recipes
        </Button>
        <Button
          type="button"
          onClick={ () => redirectTo('favorite-recipes') }
          data-testid="profile-favorite-btn"
          variant="warning"
        >
          Favorite Recipes
        </Button>
        <Button
          type="button"
          onClick={ () => redirectTo('logout') }
          data-testid="profile-logout-btn"
          variant="warning"
        >
          Logout
        </Button>
      </Stack>
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
