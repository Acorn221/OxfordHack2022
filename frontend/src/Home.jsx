import React from 'react';
import Picture from './Picture';

const Home = () => {
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
