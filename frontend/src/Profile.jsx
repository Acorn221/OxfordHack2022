import React from 'react';
import Picture from './Picture';
const Profile = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-96 bg-red-500"></div>
      <div className="-my-16 z-10 w-full h-96 flex justify-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            className="aspect-square h-full rounded-full"
            src="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
          />
          <h1 className="text-7xl text-white">John Costa</h1>
        </div>
      </div>
      <div className="my-32 w-full px-4 flex flex-col justify-center items-center gap-16">
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
          subject="Danny"
          photographer="John"
          caption="Caption #1"
          pictureUrl="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
        />
      </div>
    </div>
  );
};
export default Profile;
