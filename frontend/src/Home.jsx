import React, { useEffect } from 'react';
import Picture from './Picture';

import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    callSecureApi();
  }, []);

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
    } catch (error) {}
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl text-white">Recent Posts</h1>
      <div className="w-full px-4 flex flex-col justify-center items-center gap-16">
        <Picture
          subject="Danny"
          photographer="John"
          caption="Caption #1"
          pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
        />
        <Picture
          subject="Danny"
          photographer="John"
          caption="Caption #1"
          pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
        />
        <Picture
          caption="Caption #1"
          subject="Danny"
          photographer="John"
          pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
        />
        <Picture
          subject="Danny"
          photographer="John"
          caption="Caption #1"
          pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
        />
        <Picture
          subject="Danny"
          photographer="John"
          caption="Caption #1"
          pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
        />
      </div>
    </div>
  );
};
export default Home;