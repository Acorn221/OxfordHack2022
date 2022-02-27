import React from 'react';

const FriendCard = () => {
  return (
    <div className="flex">
      <div className="w-auto flex flex-col bg-white">
        <div className="w-full h-full flex justify-center">
          <img
            className="object-contain max-h-96"
            src="https://thumbs.dreamstime.com/z/selfie-times-square-young-man-taking-44840581.jpg"
          />
        </div>
        <div className="w-full h-full flex flex-col px-4 py-2">
          <h2 className="text-5xl text-center">Person name</h2>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;
