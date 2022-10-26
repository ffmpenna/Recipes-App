import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../Components/SearchBar';
import renderWithProvider from './helper/renderWithProvider';

describe('Testa o SearchBar', () => {
  test('Testa se os componentes do SearchBar estão sendo renderizados', async () => {
    act(() => {
      renderWithProvider(<SearchBar />);
    });
    const ingredient = screen.getByText(/ingredientes/i);
    const nome = screen.getByText(/nome/i);
    const firstLetter = screen.getByText(/primeira letra/i);
    expect(ingredient).toBeInTheDocument();
    expect(nome).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    const radioBtn = screen.queryAllByRole('radio');
    expect(radioBtn.length).toBe(3);
  });
  it('Testa os radio buttons', () => {
    act(() => {
      renderWithProvider(<SearchBar />);
    });
    const radioBtn = screen.queryAllByRole('radio');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    const execBtn = screen.getByTestId('exec-search-btn');
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(execBtn).toBeInTheDocument();
    userEvent.click(radioBtn[0]);
    expect(radioIngredient).toBeChecked();
    userEvent.click(radioBtn[1]);
    expect(radioIngredient).not.toBeChecked();
  });
});
