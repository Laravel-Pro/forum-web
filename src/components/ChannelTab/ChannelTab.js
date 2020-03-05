import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function ChannelTab(props) {
  const { channels = [] } = props;
  return (
    <Nav variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <LinkContainer to="/channel/all">
          <Nav.Link>全部</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      {channels.map((ch) => (
        <Nav.Item key={ch.slug}>
          <LinkContainer to={`/channel/${ch.slug}`}>
            <Nav.Link>{ch.name}</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ))}
    </Nav>
  );
}

ChannelTab.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  })),
};

ChannelTab.defaultProps = {
  channels: [],
};

export default ChannelTab;
