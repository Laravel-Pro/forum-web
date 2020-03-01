import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

class ChannelTab extends Component {
  render() {
    const { channels = [] } = this.props;
    return (
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">全部</Nav.Link>
        </Nav.Item>
        { channels.map((ch) => (
          <Nav.Item key={ch.slug}>
            <Nav.Link href={`/${ch.slug}`}>{ch.name}</Nav.Link>
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
