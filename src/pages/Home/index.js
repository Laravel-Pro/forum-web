import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ChannelTab, ThreadList } from 'components';
import {
  Button, Card, Container, Col, Row,
} from 'react-bootstrap';
import { getChannels } from 'services/channel';
import { getThreads } from 'services/thread';
import UserContext from 'UserContext';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      threads: [],
      pagination: {
        currentPage: 1,
        perPage: 50,
        total: 0,
      },
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
    const { pagination: { currentPage } } = this.state;

    const ch = channel !== 'all' ? channel : undefined;
    const resp = await getThreads(currentPage, ch);
    const { data: threads, pagination } = resp;
    this.setState({ threads, pagination });
  }

  handlePageChange = (page) => {
    const { pagination } = this.state;
    this.setState({
      pagination: { ...pagination, currentPage: page },
    }, this.fetchThreads);
  }

  handleNewThread = () => {
    const { history } = this.props;
    history.push('/thread/new');
  }

  postThreadRender = () => {
    const { user } = this.context;
    if (user.id) {
      return (
        <Card style={{ height: 140 }}>
          <Card.Body>
            <Button
              variant="outline-dark"
              block
              onClick={this.handleNewThread}
            >
              发 帖
            </Button>
          </Card.Body>
        </Card>
      );
    }
    return null;
  }

  render() {
    const { channels, threads, pagination } = this.state;
    return (
      <Container className="mt-2">
        <Row>
          <Col lg={9}>
            <ChannelTab channels={channels} />
            <ThreadList
              threads={threads}
              pagination={{
                ...pagination,
                onChange: this.handlePageChange,
              }}
            />
          </Col>
          <Col lg={3}>
            {this.postThreadRender()}
          </Col>
        </Row>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Home.contextType = UserContext;

export default withRouter(Home);
