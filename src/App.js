import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import UserContext from 'UserContext';
import ChannelContext from 'ChannelContext';
import BasicLayout from 'pages/BasicLayout';
import { getSelf } from 'services/user';
import { getChannels } from 'services/channel';
import { getDBStatus, getVersion } from 'services/status';
import { Header } from 'components';
import AuthLayout from 'pages/Auth/AuthLayout';
import './theme.scss';

function ChannelsProvider({ children }) {
  const { Provider } = ChannelContext;
  const [channels, updateChannels] = useState([]);
  useEffect(() => {
    getChannels().then((resp) => {
      updateChannels(resp);
    });
  }, []);

  return <Provider value={{ channels, updateChannels }}>{children}</Provider>;
}

ChannelsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function LogoutButton({ loggedIn }) {
  const history = useHistory();
  return loggedIn ? (
    <Button variant="light" onClick={() => history.push('/auth/logout')}>登出</Button>
  ) : null;
}

LogoutButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

function App() {
  const [user, updateUser] = useState({});
  const [version, setVersion] = useState('');
  const [db, setDb] = useState('');

  useEffect(() => {
    getSelf().then((resp) => {
      updateUser(resp);
    }).catch((resp) => {
      if (resp.status === 401) {
        // TODO 未登录
      } else {
        // eslint-disable-next-line no-console
        console.error(resp);
      }
    });

    getVersion().then((resp) => {
      setVersion(resp.version);
    });

    getDBStatus().then((resp) => {
      setDb(resp.db);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <ChannelsProvider>
        <BrowserRouter>
          <Header
            extra={<LogoutButton loggedIn={!!user.id} />}
          />

          <Switch>
            <Route path="/auth">
              <AuthLayout />
            </Route>
            <Route path="/">
              <BasicLayout />
            </Route>

            <Route path="*">
              <Redirect to="/channel/all" />
            </Route>
          </Switch>
        </BrowserRouter>
      </ChannelsProvider>
      <footer className="text-muted fixed-bottom">
        {`ver: ${version} | db: ${db}`}
      </footer>
    </UserContext.Provider>
  );
}

export default App;
