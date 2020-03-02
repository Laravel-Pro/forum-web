import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ChannelTab from './ChannelTab';


const history = createMemoryHistory();

it('should show "all" tab', () => {
  const { getByText } = render(
    <Router history={history}>
      <Route
        path="/"
        render={() => <ChannelTab />}
      />
    </Router>,
  );
  const allTab = getByText(/全部/);
  expect(allTab).toBeInTheDocument();
});


it('should show tabs', () => {
  const channels = [
    { id: 1, name: 'Foo', slug: 'foo' },
    { id: 1, name: 'Bar', slug: 'bar' },
  ];
  const { getByText } = render(
    <Router history={history}>
      <Route
        path="/"
        render={() => <ChannelTab channels={channels} />}
      />
    </Router>,
  );
  channels.forEach((ch) => {
    expect(getByText(ch.name)).toBeInTheDocument();
  });
});

it('should navigate to channel link', () => {
  const channels = [
    { id: 1, name: 'Foo', slug: 'foo' },
    { id: 1, name: 'Bar', slug: 'bar' },
  ];

  const { getByText } = render(
    <Router history={history}>
      <Route
        path="/"
        render={() => <ChannelTab channels={channels} />}
      />
    </Router>,
  );

  channels.forEach(({ name, slug }) => {
    fireEvent.click(getByText(name));
    expect(getByText(name)).toHaveClass('active');
    expect(history.location.pathname).toEqual(`/channel/${slug}`);
  });
});
