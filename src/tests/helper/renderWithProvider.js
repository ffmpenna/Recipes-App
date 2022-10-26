import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Provider from '../../context/Provider';

export default function renderWithProvider(children, route = '/') {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Router history={ history }>
        <Provider>
          { children }
        </Provider>
      </Router>,
    ),
    history,
  };
}
