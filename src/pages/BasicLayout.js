import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Thread from 'pages/Thread';
import NewThread from 'pages/Thread/NewThread';
import AuthLayout from 'pages/Auth/AuthLayout';

function BasicLayout() {
  return (
    <Switch>
      <Route path="/channel/:channel">
        <Home />
      </Route>
      <Route path="/thread/new">
        <NewThread />
      </Route>
      <Route path="/thread/:id">
        <Thread />
      </Route>
      <Route path="/auth">
        <AuthLayout />
      </Route>
      <Route path="*">
        <Redirect to="/channel/all" />
      </Route>
    </Switch>
  );
}

export default BasicLayout;
