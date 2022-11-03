import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithProvider from './helper/renderWithProvider';

describe('Testa o SearchBar', () => {
  beforeEach(() => {
    act(() => {
      renderWithProvider(<App />, '/meals');
    });
  });
  test('Testa se os componentes do SearchBar estão sendo renderizados', async () => {
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
  describe('Testa a função de busca', () => {
    test('Testa a pesquisa bem sucedida', () => {
      const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
      const inputTextPesquisa = screen.getByTestId('search-top-btn');
      const buttonBusca = screen.getByRole('button', { name: /buscar/i });
      userEvent.click(radioFirstLetter);
      userEvent.click(inputTextPesquisa);
      const inputSearch = screen.getByRole('textbox');
      expect(inputSearch).toBeInTheDocument();
      userEvent.type(inputSearch, 'corba');
      userEvent.click(buttonBusca);
    });
    test('Testa os alertas caso a pesquisa seja mal sucedida', () => {
      jest.spyOn(global, 'alert');
      const radioFirstLetter = screen.getByRole('radio', {
        name: /primeira letra/i,
      });
      const searchIcon = screen.getByRole('img', { name: /search-icon/i });
      const searchInput = screen.queryByRole('textbox');
      const searchButton = screen.getByRole('button', { name: /buscar/i });

      userEvent.click(radioFirstLetter);
      userEvent.click(searchIcon);
      userEvent.type(searchInput, 'aa');
      userEvent.click(searchButton);
      expect(global.alert).toHaveBeenCalledTimes(2);
      expect(global.alert).toHaveBeenCalledWith(
        'Your search must have only 1 (one) character',
      );
    });
  });
});
