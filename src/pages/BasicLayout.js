import React, { Component } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { Header } from 'components';
import Home from 'pages/Home';
import Register from 'pages/Auth/Register';
import { getDBStatus, getVersion } from 'services/status';

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
        <Header />

        <BrowserRouter>
          <Switch>
            <Route path="/channel/:channel">
              <Home />
            </Route>
            <Route path="/auth/register">
              <Register />
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
