import React from 'react';
import { render } from '@testing-library/react';
import ChannelTab from './ChannelTab';

it('should show "all" tab', () => {
  const { getByText } = render(<ChannelTab />);
  const allTab = getByText(/全部/);
  expect(allTab).toBeInTheDocument();
});


it('should show tabs', () => {
  const channels = [
    { id: 1, name: 'Foo', slug: 'foo' },
    { id: 1, name: 'Bar', slug: 'bar' },
  ];
  const { getByText } = render(<ChannelTab channels={channels} />);
  channels.forEach((ch) => {
    expect(getByText(ch.name)).toBeInTheDocument();
  });
});
