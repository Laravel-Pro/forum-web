import React, { useContext } from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import Home from 'pages/Home';
import Thread from 'pages/Thread';
import NewThread from 'pages/Thread/NewThread';
import AuthLayout from 'pages/Auth/AuthLayout';
import {
  Button, Card, Col, Container, Row,
} from 'react-bootstrap';
import UserContext from 'UserContext';

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

function BasicLayout() {
  return (
    <Container className="mt-2">
      <Row>
        <Col lg={9}>
          <Switch>
            <Route path="/channel/:channel">
              <Home />
            </Route>
            <Route path="/thread/new">
              <NewThread />
            </Route>
            <Route path="/thread/:id">
              <Thread />
            </Route>
            <Route path="/auth">
              <AuthLayout />
            </Route>
            <Route path="*">
              <Redirect to="/channel/all" />
            </Route>
          </Switch>
        </Col>
        <Col lg={3}>
          <ActionsCard />
        </Col>
      </Row>
    </Container>
  );
}

export default BasicLayout;
