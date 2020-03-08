import React from 'react';
import { Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Laravel Pro</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
