import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('have Laravel Pro title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Laravel Pro/i);
  expect(linkElement).toBeInTheDocument();
});
