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
          <Link to="/" className="w-full h-full">
            <div
              className={clsx(
                'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 hover:animate-spin rounded transition-all',
                getHighlights('/')
              )}>
              <p className="text-xl text-white">Home</p>
            </div>
          </Link>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <Link to="/profile/posts" className="w-full h-full">
            <div
              className={clsx(
                'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 hover:animate-spin rounded transition-all',
                getHighlights('/profile/posts')
              )}>
              <p className="text-xl text-white">Profile</p>
            </div>
          </Link>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <Link to="/upload" className="w-full h-full">
            <div
              className={clsx(
                'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 hover:animate-spin rounded transition-all',
                getHighlights('/upload')
              )}>
              <p className="text-xl text-white">Upload</p>
            </div>
          </Link>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <Link to="/friends" className="w-full h-full">
            <div
              className={clsx(
                'w-1/2 h-full flex justify-center items-center hover:bg-sky-500 hover:animate-spin rounded transition-all',
                getHighlights('/friends')
              )}>
              <p className="text-xl text-white">Friends</p>
            </div>
          </Link>
        </div>
        <div
          className={clsx(
            'w-full h-full flex justify-center items-center hover:bg-sky-500 hover:animate-spin rounded transition-all'
          )}>
          <AuthenticationButton />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
