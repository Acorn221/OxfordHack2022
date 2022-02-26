import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import AuthenticationButton from './authentication-button';

const DefaultLayout = () => {
  return (
    <div className="w-full min-h-screen bg-slate-900">
      <div className="w-full h-16 border-b-2 border-slate-200 flex justify-between items-center">
        <div className="w-full h-full flex justify-center items-center">
          <Link to="/">
            <p className="text-xl text-white">Home</p>
          </Link>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <Link to="/profile/posts">
            <p className="text-xl text-white">Profile</p>
          </Link>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <Link to="/upload">
            <p className="text-xl text-white">Upload</p>
          </Link>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <AuthenticationButton />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
