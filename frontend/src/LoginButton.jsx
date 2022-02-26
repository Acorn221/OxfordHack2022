import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { getAccessTokenSilently, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((r) => console.log(r));
  }, []);

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{' '}
        <button onClick={() => logout({ returnTo: 'http://localhost:3000/' })}>Log out</button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
};
export default LoginButton;
