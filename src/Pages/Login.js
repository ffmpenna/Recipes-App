import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Login({ history }) {
  const { handleChange, isDisabled, submitLogin } = useContext(MyContext);

  const teste = () => {
    submitLogin();
    history.push('/meals');
  };

  return (
    <form>
      <input
        type="email"
        name="inputEmail"
        data-testid="email-input"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="inputPassword"
        data-testid="password-input"
        onChange={ handleChange }
      />
      <button
        type="button"
        disabled={ isDisabled }
        data-testid="login-submit-btn"
        onClick={ teste }
      >
        Enviar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default Login;
