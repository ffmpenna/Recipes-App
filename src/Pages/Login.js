import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

function Login() {
  const { handleChange, isDisabled, submitLogin } = useContext(MyContext);
  const history = useHistory();

  const redirectTo = (pathname) => {
    submitLogin();
    history.push(pathname);
  };

  return (
    <div className="login-container">
      <form className="form login-form">
        <h3 className="login-title">Login</h3>
        <label htmlFor="inputEmail">
          <input
            className="input text-input"
            type="email"
            name="inputEmail"
            id="inputEmail"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="inputPassword">
          <input
            className="input text-input"
            type="password"
            name="inputPassword"
            id="inputPassword"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ handleChange }
          />
        </label>
        <button
          className="button login-button"
          type="button"
          disabled={ isDisabled }
          data-testid="login-submit-btn"
          onClick={ () => redirectTo('/meals') }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default Login;
