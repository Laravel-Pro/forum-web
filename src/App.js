import React from 'react';
import { Badge, Navbar } from 'react-bootstrap';
import './theme.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      version: '',
    }
  }

  componentDidMount() {
    fetch('api/version').then(resp => {
      resp.json().then(body => {
        this.setState({ version: body.version });
      })
    })
  }

  render() {
    const { version } = this.state;
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Laravel Pro</Navbar.Brand>
          <Badge variant="dark">{version}</Badge>
        </Navbar>
      </div>
    );
  }
}

export default App;
