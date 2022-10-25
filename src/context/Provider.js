import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [loginInfo, setLoginInfo] = useState({
    inputEmail: '',
    inputPassword: '',
  });

  const [isDisabled, toggleButton] = useState(true);

  const validateInputs = useCallback(() => {
    const { inputEmail, inputPassword } = loginInfo;
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const verifyEmail = Regex.test(inputEmail);
    const number = 6;
    const verifyUser = inputPassword.length > number;
    toggleButton(!(verifyEmail && verifyUser));
  }, [loginInfo]);

  const handleChange = useCallback(
    ({ target }) => {
      const auxValues = { ...loginInfo };
      auxValues[target.name] = target.value;
      setLoginInfo(auxValues);
    },
    [loginInfo],
  );

  const submitLogin = useCallback(() => {
    const { inputEmail } = loginInfo;
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
  }, [loginInfo]);

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  const contextValue = useMemo(
    () => ({
      isDisabled,
      loginInfo,
      handleChange,
      submitLogin,
    }),
    [isDisabled, loginInfo, handleChange, submitLogin],
  );

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default Provider;
