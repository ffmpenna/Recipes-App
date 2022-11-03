import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithProvider from './helper/renderWithProvider';

describe('Testa a tela de Login', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    act(() => {
      renderWithProvider(<App />, '/profile');
    });
  });
  test('Verifica se os elementos estão sendo renderizados', () => {
    const email = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    const elements = [email, doneBtn, favoriteBtn, logoutBtn];

    elements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Testa o redirecionamento dos botões', () => {
    const doneBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(doneBtn);
    const profileBtn = screen.getByRole('img', { name: /profile-icon/i });
    const doneTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneTitle).toBeInTheDocument();
    userEvent.click(profileBtn);

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteBtn);
    const favoriteTitle = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    expect(favoriteTitle).toBeInTheDocument();
    const profileBtn2 = screen.getByRole('img', { name: /profile-icon/i });
    userEvent.click(profileBtn2);

    const logoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutBtn);
    const loginTitle = screen.getByRole('heading', { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  });
});
