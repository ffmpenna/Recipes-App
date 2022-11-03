import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithProvider from './helper/renderWithProvider';

describe('Testa a tela de Login', () => {
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';
  const SUBMIT_BTN = 'login-submit-btn';

  beforeEach(() => {
    act(() => {
      renderWithProvider(<App />);
    });
  });

  test('Testa se os componentes do login estão sendo renderizados', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(SUBMIT_BTN);

    const elements = [emailInput, passwordInput, submitBtn];

    elements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Testa se a validação dos inputs está funcionando', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(SUBMIT_BTN);

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
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(SUBMIT_BTN);

    const validEmail = 'teste@teste.com';
    const validPassword = '1234567';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(submitBtn);
  });
});
