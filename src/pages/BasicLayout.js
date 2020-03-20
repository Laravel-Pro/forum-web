import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Thread from 'pages/Thread';
import NewThread from 'pages/Thread/NewThread';
import AuthLayout from 'pages/Auth/AuthLayout';
import { Col, Container, Row } from 'react-bootstrap';
import ProfileCard from 'pages/ProfileCard';

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
          <ProfileCard />
        </Col>
      </Row>
    </Container>
  );
}

export default BasicLayout;
