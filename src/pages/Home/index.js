import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ChannelTab, ThreadList } from 'components';
import {
  Button, Card, Container, Col, Row,
} from 'react-bootstrap';
import { getThreads } from 'services/thread';
import UserContext from 'UserContext';
import ChannelContext from 'ChannelContext';

function ActionsCard() {
  const { user } = useContext(UserContext);
  const history = useHistory();

  function handleNewThread() {
    history.push('/thread/new');
  }

  if (user.id) {
    return (
      <Card style={{ height: 140 }}>
        <Card.Body>
          <Button
            variant="outline-dark"
            block
            onClick={handleNewThread}
          >
            发 帖
          </Button>
        </Card.Body>
      </Card>
    );
  }
  return null;
}

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
    <Container className="mt-2">
      <Row>
        <Col lg={9}>
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
        </Col>
        <Col lg={3}>
          <ActionsCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
