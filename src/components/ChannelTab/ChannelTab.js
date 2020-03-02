import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ChannelTab extends Component {
  render() {
    const { channels = [] } = this.props;
    return (
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <LinkContainer to="/channel/all">
            <Nav.Link>全部</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        { channels.map((ch) => (
          <Nav.Item key={ch.slug}>
            <LinkContainer to={`/channel/${ch.slug}`}>
              <Nav.Link>{ch.name}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ))}
      </Nav>
    );
  }
}

ChannelTab.propTypes = {
  channels: PropTypes.array,
};

export default ChannelTab;
