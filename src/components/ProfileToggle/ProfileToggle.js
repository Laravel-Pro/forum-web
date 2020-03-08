import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const { Toggle, Menu } = Dropdown;

// eslint-disable-next-line react/prop-types
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div ref={ref} onClick={onClick} role="button">
    {children}
    {' '}
    &#x25bc;
  </div>
));

function ProfileToggle({ user }) {
  if (!user.username) {
    return (
      <>
        <Link to="/auth/login">登录</Link>
        <Link to="/auth/register">注册</Link>
      </>
    );
  }
  return (
    <Dropdown>
      <Toggle as={CustomToggle}>
        <span>{user.username}</span>
      </Toggle>
      <Menu>
        <Dropdown.Item>登出</Dropdown.Item>
      </Menu>
    </Dropdown>
  );
}

ProfileToggle.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};

ProfileToggle.defaultProps = {
  user: {},
};

export default ProfileToggle;
