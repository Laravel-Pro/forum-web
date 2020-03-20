import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from 'UserContext';
import { logout } from 'services/auth';

function Logout() {
  const { user, updateUser } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    async function doLogout() {
      const resp = await logout();
      if (resp.logout === true) {
        updateUser({});
        setLoggedOut(true);
      }
    }
    if (user.id) {
      doLogout();
    }
  }, [updateUser, user]);

  if (loggedOut) {
    return <Redirect to="/" />;
  }

  return (
    <p className="text-center">正在登出...</p>
  );
}

export default Logout;
