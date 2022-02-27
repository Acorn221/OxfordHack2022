import React, { useEffect } from 'react';
import Picture from './Picture';

import { useAuth0 } from '@auth0/auth0-react';
import Friends from './Friends';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth0();

  useEffect(() => {
    axios.get('/api/getfeed').then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-10 w-full flex flex-col justify-center items-center">
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
      <div className="col-span-2 h-full "></div>
    </div>
  );
};
export default Home;
