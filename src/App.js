import React from 'react';
import { Badge, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Home from 'pages/Home';
import { getDBStatus, getVersion } from 'services/status';
import './theme.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '',
      db: '',
    };
  }

  componentDidMount() {
    getVersion().then(({ version }) => {
      this.setState({ version });
    });

    getDBStatus().then(({ db }) => {
      this.setState({ db });
    });
  }

  render() {
    const { version, db } = this.state;
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Laravel Pro</Navbar.Brand>
          <Badge variant="dark">
            Ver:
            {version}
          </Badge>
          <Badge variant="dark" className="ml-1">
            DB:
            {db}
          </Badge>
        </Navbar>

        <Router>
          <Switch>
            <Route path="/channel/:channel">
              <Home />
            </Route>
            <Route path="*">
              <Redirect to="/channel/all" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
