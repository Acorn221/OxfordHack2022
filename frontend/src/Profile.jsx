import { useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-96 bg-red-500"></div>
      <div className="-my-16 z-10 w-full h-96 flex justify-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            className="object-contain aspect-square h-full rounded-full"
            src="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
          />
          <h1 className="text-7xl text-white">John Costa</h1>
        </div>
      </div>
      <div className="w-full h-36" />
      <button onClick={() => testPayment()}>Testing Stripe</button>
      <div className="w-full h-12 flex justify-center items-center">
        <div className="w-full">
          <Link to="/profile/posts">
            <p className="text-2xl text-center text-white">My Posts</p>
          </Link>
        </div>
        <div className="w-full">
          <Link to="/profile/photos">
            <p className="text-2xl text-center text-white">My Photos</p>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default Profile;
