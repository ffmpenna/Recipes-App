import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import Footer from '../Pages/Footer';

describe('testa o componente Footer', () => {
  it('testa se existem o elementos no componente', () => {
    act(() => {
      renderWithProvider(<Footer />);
      const footer = screen.getByTestId(/footer/i);
      expect(footer).toBeInTheDocument();
    });
  });
});
