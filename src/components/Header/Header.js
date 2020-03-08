import React from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Header({ extra }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="mr-auto" href="/">Laravel Pro</Navbar.Brand>
      {extra}
    </Navbar>
  );
}

Header.propTypes = {
  extra: PropTypes.node,
};

Header.defaultProps = {
  extra: '',
};

export default Header;
