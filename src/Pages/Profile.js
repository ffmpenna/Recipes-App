// import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import Footer from './Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" withoutSearch />
      <Footer />
    </div>
  );
}

// Profile.propTypes = {};

export default Profile;
