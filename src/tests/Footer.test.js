import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithProvider from './helper/renderWithProvider';
import Footer from '../Pages/Footer';

describe('testa o componente Footer', () => {
  beforeEach(() => {
    act(() => {
      renderWithProvider(<Footer />, 'footer');
    });
  });
  it('testa se existem o elementos no componente', () => {
    const footer = screen.getByTestId(/footer/i);
    expect(footer).toBeInTheDocument();
  });
});
