import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className="rounded-md bg-white w-1/2 h-3/5" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
