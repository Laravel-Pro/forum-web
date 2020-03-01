import React from 'react';
import { Badge, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
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
    fetch('api/status/version').then((resp) => {
      resp.json().then((body) => {
        this.setState({ version: body.version });
      });
    });

    fetch('api/status/db').then((resp) => {
      resp.json().then((body) => {
        this.setState({ db: body.db });
      });
    });
  }

  render() {
    const { version, db } = this.state;
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Laravel Pro</Navbar.Brand>
          <Badge variant="dark">Ver: {version}</Badge>
          <Badge variant="dark" className="ml-1">DB: {db}</Badge>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
