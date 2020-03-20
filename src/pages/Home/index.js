import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChannelTab, ThreadList } from 'components';
import { getThreads } from 'services/thread';
import ChannelContext from 'ChannelContext';

function Home() {
  const { channels } = useContext(ChannelContext);
  const match = useRouteMatch('/channel/:channel');
  const { params: { channel } } = match;

  const [threads, setThreads] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 50,
    total: 0,
  });

  useEffect(() => {
    const ch = channel !== 'all' ? channel : undefined;
    getThreads(pagination.currentPage, ch).then((resp) => {
      setThreads(resp.data);
      setPagination(resp.pagination);
    });
  }, [channel, pagination.currentPage]);

  return (
    <div>
      <ChannelTab channels={channels} />
      <ThreadList
        threads={threads}
        pagination={{
          ...pagination,
          onChange: (page) => {
            setPagination({ ...pagination, currentPage: page });
          },
        }}
      />
    </div>
  );
}

export default Home;
