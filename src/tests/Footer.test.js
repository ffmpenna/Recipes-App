import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithProvider from './helper/renderWithProvider';

describe('testa o componente Footer', () => {
  it('testa se existem o elementos no componente', () => {
    act(() => {
      renderWithProvider(<App />, '/meals');
    });
    const footer = screen.getByTestId(/footer/i);
    const buttonDrink = screen.getByTestId(/drinks-bottom-btn/i);
    const buttonMeals = screen.getByTestId(/meals-bottom-btn/i);
    const elementsArray = [footer, buttonDrink, buttonMeals];
    elementsArray.forEach((element) => expect(element).toBeInTheDocument());
  });
  it('testa se e redirecionado para a página drinks', () => {
    act(() => {
      renderWithProvider(<App />, '/meals');
    });
    const testDrink = screen.getByTestId(/drinks-bottom-btn/i);
    userEvent.click(testDrink);
  });
  it('testa se e redirecionado para a página meals', () => {
    act(() => {
      renderWithProvider(<App />, '/drinks');
    });
    const testMeals = screen.getByTestId(/meals-bottom-btn/i);
    userEvent.click(testMeals);
  });
});
