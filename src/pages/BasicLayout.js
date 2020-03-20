import React, { Component } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { Header, ProfileToggle } from 'components';
import Home from 'pages/Home';
import Register from 'pages/Auth/Register';
import Login from 'pages/Auth/Login';
import { getDBStatus, getVersion } from 'services/status';
import UserContext from 'UserContext';
import Thread from 'pages/Thread';
import NewThread from 'pages/Thread/NewThread';
import Logout from 'pages/Auth/Logout';

class BasicLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '',
      db: '',
    };
  }

  componentDidMount() {
    getVersion().then(({ version }) => {
      this.setState({ version });
    });

    getDBStatus().then(({ db }) => {
      this.setState({ db });
    });
  }

  render() {
    const { version, db } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Header
            extra={(
              <UserContext.Consumer>
                {({ user }) => <ProfileToggle user={user} />}
              </UserContext.Consumer>
            )}
          />

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
            <Route path="/auth/register">
              <Register />
            </Route>
            <Route path="/auth/login">
              <Login />
            </Route>
            <Route path="/auth/logout">
              <Logout />
            </Route>
            <Route path="*">
              <Redirect to="/channel/all" />
            </Route>
          </Switch>
        </BrowserRouter>
        <footer className="text-muted fixed-bottom">
          {`ver: ${version} | db: ${db}`}
        </footer>
      </div>
    );
  }
}

export default BasicLayout;
