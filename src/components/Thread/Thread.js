import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Media } from 'react-bootstrap';

export const ThreadPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  replies_count: PropTypes.number.isRequired,
  activity_at: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
});

function Thread({ thread }) {
  const {
    author,
    channel,
    title,
    replies_count: repliesCount,
    created_at: createdAt,
  } = thread;
  return (
    <Media as="li" className="thread p-2">
      <img
        width={64}
        height={64}
        className="align-self-start mr-3"
        src={author.avatar_url}
        alt={`avatar of ${author.username}`}
      />
      <Media.Body className="d-flex">
        <div className="flex-fill">
          <h5 className="thread-title">{title}</h5>
          <Badge variant="light" className="channel-name">{channel.name}</Badge>
          <span className="text-muted small">{`由 ${author.username} 发布于 ${createdAt}`}</span>
        </div>
        <div className="align-self-center">
          <Badge variant="info" className="replies-count">{repliesCount}</Badge>
        </div>
      </Media.Body>
    </Media>
  );
}

Thread.propTypes = {
  thread: ThreadPropTypes.isRequired,
};

export default Thread;
