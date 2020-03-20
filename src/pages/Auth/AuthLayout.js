import React from 'react';
import { Route } from 'react-router-dom';
import Register from 'pages/Auth/Register';
import Login from 'pages/Auth/Login';
import Logout from 'pages/Auth/Logout';

function AuthLayout() {
  return (
    <div>
      <Route path="/auth/register">
        <Register />
      </Route>
      <Route path="/auth/login">
        <Login />
      </Route>
      <Route path="/auth/logout">
        <Logout />
      </Route>
    </div>
  );
}

export default AuthLayout;
