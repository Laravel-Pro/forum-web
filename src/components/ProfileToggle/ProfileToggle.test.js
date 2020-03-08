import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProfileToggle from './ProfileToggle';


const history = createMemoryHistory();

it('should show username when user given', () => {
  const username = 'Tom';
  const { getByText } = render(
    <Router history={history}>
      <Route
        path="/"
        render={() => <ProfileToggle user={{ username }} />}
      />
    </Router>,
  );
  const toggle = getByText(username);
  expect(toggle).toBeInTheDocument();
});

it('should show dropdown logout when user given', () => {
  const username = 'Tom';
  const { getByText } = render(
    <Router history={history}>
      <Route
        path="/"
        render={() => <ProfileToggle user={{ username }} />}
      />
    </Router>,
  );
  const toggle = getByText(username);
  fireEvent.click(toggle);
  const logout = getByText('登出');
  expect(logout).toBeInTheDocument();
});

it('should show login and register link when user is not given', () => {
  const { getByText } = render(
    <Router history={history}>
      <Route
        path="/"
        render={() => <ProfileToggle />}
      />
    </Router>,
  );

  const login = getByText('登录');
  expect(login).toHaveAttribute('href', '/auth/login');

  const register = getByText('注册');
  expect(register).toHaveAttribute('href', '/auth/register');
});
