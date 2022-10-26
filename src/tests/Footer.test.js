import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithProvider from './helper/renderWithProvider';
import Footer from '../Pages/Footer';

describe('testa o componente Footer', () => {
  it('testa se existem o elementos no componente', () => {
    act(() => {
      renderWithProvider(<Footer />, 'footer');
    });
    const footer = screen.getByTestId(/footer/i);
    const buttonDrink = screen.getByTestId(/drinks-bottom-btn/i);
    const buttonMeals = screen.getByTestId(/meals-bottom-btn/i);
    const elementsArray = [footer, buttonDrink, buttonMeals];
    elementsArray.forEach((element) => expect(element).toBeInTheDocument());
  });
  it('testa se e redirecionado para a página drinks', () => {
    const { history } = renderWithProvider(<Footer />);
    const testDrink = screen.getByTestId(/drinks-bottom-btn/i);
    userEvent.click(testDrink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');
  });
  it('testa se e redirecionado para a página meals', () => {
    const { history } = renderWithProvider(<Footer />);
    const testMeals = screen.getByTestId(/meals-bottom-btn/i);
    userEvent.click(testMeals);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');
  });
});
