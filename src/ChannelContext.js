import React from 'react';

const channelContext = React.createContext({
  channels: {},
  updateChannels: () => {},
});

export default channelContext;
