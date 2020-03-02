import React, { Component } from 'react';
import { ChannelTab } from 'components';
import Container from 'react-bootstrap/Container';
import { getChannels } from 'services/channel';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    };
  }

  componentDidMount() {
    this.fetchChannels();
  }


  fetchChannels = async () => {
    const channels = await getChannels();
    this.setState({ channels });
  }

  render() {
    const { channels } = this.state;
    return (
      <Container className="mt-2">
        <ChannelTab channels={channels} />
      </Container>
    );
  }
}

export default Home;
