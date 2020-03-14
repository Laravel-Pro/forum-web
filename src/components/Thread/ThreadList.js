import React from 'react';
import PropTypes from 'prop-types';
import Thread, { ThreadPropTypes } from './Thread';

function ThreadList({ threads }) {
  return (
    <div className="thread-list">
      <ul className="list-unstyled">
        {threads.map((it) => <Thread key={it.id} thread={it} />)}
      </ul>
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(ThreadPropTypes).isRequired,
};

export default ThreadList;
