import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="rounded-md bg-white w-1/2 h-3/5"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }>
      Log Out
    </button>
  );
};

export default LogoutButton;
