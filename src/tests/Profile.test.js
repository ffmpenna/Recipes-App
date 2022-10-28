import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Profile from '../Pages/Profile';
import renderWithProvider from './helper/renderWithProvider';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Testa a tela de Login', () => {
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';
  const SUBMIT_BTN = 'login-submit-btn';

  beforeEach(() => {
    act(() => {
      renderWithProvider(<App />);
    });
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

    expect(mockHistoryPush).toHaveBeenCalledWith('/meals');
  });
  test('Verifica se os elementos estão sendo renderizados', () => {
    act(() => {
      renderWithProvider(<Profile />);
    });

    const email = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    const elements = [email, doneBtn, favoriteBtn, logoutBtn];

    elements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Testa o redirecionamento dos botões', () => {
    act(() => {
      renderWithProvider(<Profile />);
    });
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(doneBtn);
    expect(mockHistoryPush).toHaveBeenCalledWith('done-recipes');

    userEvent.click(favoriteBtn);
    expect(mockHistoryPush).toHaveBeenCalledWith('favorite-recipes');

    userEvent.click(logoutBtn);
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
