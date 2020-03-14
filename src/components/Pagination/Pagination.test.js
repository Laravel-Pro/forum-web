import React from 'react';
import { render } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should disable all button when total is 0', () => {
    const { container } = render(<Pagination total={0} currentPage={1} perPage={15} />);
    const pageItem = container.querySelectorAll('.page-item');
    pageItem.forEach((item) => {
      expect(item).toHaveClass('disabled');
    });
  });
});
