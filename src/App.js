import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from 'UserContext';
import ChannelContext from 'ChannelContext';
import BasicLayout from 'pages/BasicLayout';
import './theme.scss';
import { getSelf } from 'services/user';
import { getChannels } from 'services/channel';

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

function App() {
  const [user, updateUser] = useState({});

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
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <ChannelsProvider>
        <BasicLayout />
      </ChannelsProvider>
    </UserContext.Provider>
  );
}

export default App;
