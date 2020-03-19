import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';
import styles from './Reply.module.scss';

function Reply(props) {
  const { owner, body, createdAt } = props;
  return (
    <Media as="li" className={styles.reply}>
      <img
        width={38}
        height={38}
        className="mr-2"
        style={{ margin: 5 }}
        src={owner.avatar_url}
        alt={`avatar of ${owner.username}`}
      />
      <Media.Body>
        <b className="reply-owner">{owner.username}</b>
        <span className="small text-muted ml-2">{createdAt}</span>
        <p className="reply-body m-0">
          {body}
        </p>
      </Media.Body>
    </Media>
  );
}

Reply.propTypes = {
  owner: PropTypes.shape({
    avatar_url: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Reply;
