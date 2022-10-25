import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Testa a tela de Login', () => {
  test('Testa se os componentes do header estão sendo renderizados', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');

    const elements = [emailInput, passwordInput, submitBtn];

    elements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Testa se a validação dos inputs está funcionando', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');

    const validEmail = 'teste@teste.com';
    const invalidEmail = 'teste';

    const validPassword = '1234567';
    const invalidPassword = '123456';

    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, invalidPassword);

    expect(submitBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, validEmail);

    expect(submitBtn).toBeDisabled();

    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, validPassword);

    expect(submitBtn).not.toBeDisabled();
  });
  test('Verifica se quando clica no botão de login o usuário é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');
    const validEmail = 'teste@teste.com';
    const validPassword = '1234567';
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(submitBtn);
    console.log(history.location.pathname);
  });
});
