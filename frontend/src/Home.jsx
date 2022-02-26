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
    <div className="w-full p-2 grid grid-cols-2 gap-2">
      <Picture
        caption="Caption #1"
        pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
      />
      <Picture
        caption="Caption #1"
        pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
      />
      <Picture
        caption="Caption #1"
        pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
      />
      <Picture
        caption="Caption #1"
        pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
      />
      <Picture
        caption="Caption #1"
        pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
      />
    </div>
  );
};
export default Home;
