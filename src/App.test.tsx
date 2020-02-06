import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render App container', () => {
  const { container } = render(<App />);
  // console.log(container)
  expect(container.firstChild).toHaveClass('jumbotron');
});
