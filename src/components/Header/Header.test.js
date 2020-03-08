import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

it('should show Laravel Pro', () => {
  const { getByText } = render(<Header />);
  const allTab = getByText(/Laravel Pro/);
  expect(allTab).toBeInTheDocument();
});
