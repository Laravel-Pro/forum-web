import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ChannelTab, ThreadList } from 'components';
import Container from 'react-bootstrap/Container';
import { getChannels } from 'services/channel';
import { getThreads } from 'services/thread';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      threads: [],
    };
  }

  componentDidMount() {
    this.fetchChannels()
      .then(() => {
        this.fetchThreads();
      });
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { channel: oldChannel } } } = prevProps;
    const { match: { params: { channel } } } = this.props;

    if (oldChannel !== channel) {
      this.fetchThreads();
    }
  }

  fetchChannels = async () => {
    const channels = await getChannels();
    this.setState({ channels });
  }

  fetchThreads = async () => {
    const { match: { params: { channel } } } = this.props;
    const ch = channel !== 'all' ? channel : undefined;
    const resp = await getThreads(ch);
    const { data: threads } = resp;
    this.setState({ threads });
  }

  render() {
    const { channels, threads } = this.state;
    return (
      <Container className="mt-2">
        <ChannelTab channels={channels} />
        <ThreadList threads={threads} />
      </Container>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      channel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Home);
