import React from 'react';
import Picture from './Picture';
const Profile = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-96 bg-red-500"></div>
      <div className="-my-16 z-10 w-full h-36 flex justify-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            className="aspect-square h-full rounded-full"
            src="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
          />
          <h1 className="text-3xl text-white">John Costa</h1>
        </div>
      </div>
      <div className="mt-32 w-full grid grid-cols-2 gap-2 p-2">
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
    </div>
  );
};
export default Profile;
