import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

it('should show Laravel Pro', () => {
  const { getByText } = render(<Header />);
  const allTab = getByText(/Laravel Pro/);
  expect(allTab).toBeInTheDocument();
});

it('should have extra content', () => {
  const extraContent = 'here is extra';
  const { getByText } = render(<Header extra={extraContent} />);
  const extra = getByText(RegExp(extraContent));
  expect(extra).toBeInTheDocument();
});
