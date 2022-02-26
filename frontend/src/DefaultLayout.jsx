import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import AuthenticationButton from './authentication-button';

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const getHighlights = (givenPath) => {
    if (path == givenPath) {
      return 'bg-sky-500';
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900">
      <div className="w-full h-16 border-b-2 border-slate-200 flex justify-between items-center">
        <div className="w-full h-10 flex justify-center items-center">
          <div
            className={clsx(
              'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 rounded',
              getHighlights('/')
            )}>
            <Link to="/">
              <p className="text-xl text-white">Home</p>
            </Link>
          </div>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <div
            className={clsx(
              'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 rounded transition-all',
              getHighlights('/profile/posts')
            )}>
            <Link to="/profile/posts">
              <p className="text-xl text-white">Profile</p>
            </Link>
          </div>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <div
            className={clsx(
              'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 rounded',
              getHighlights('/upload')
            )}>
            <Link to="/upload">
              <p className="text-xl text-white">Upload</p>
            </Link>
          </div>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <div
            className={clsx(
              'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 rounded',
              getHighlights('/friends')
            )}>
            <Link to="/friends">
              <p className="text-xl text-white">Friends</p>
            </Link>
          </div>
        </div>
        <div
          className={clsx(
            'w-full h-full flex justify-center items-center hover:bg-sky-500 rounded'
          )}>
          <AuthenticationButton />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
