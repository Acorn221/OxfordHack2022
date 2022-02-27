import React from 'react';
import Picture from '../Picture';

const Photos = () => {
  return (
    <div className="my-32 w-full px-4 flex flex-col justify-center items-center gap-16">
      <Picture
        subject="Danny"
        photographer="John"
        caption="Caption #1"
        pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
      />
    </div>
  );
};
export default Photos;
