import React from 'react';

const Picture = ({ pictureUrl, caption }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <img src={pictureUrl} />
      <div className="w-full">
        <p className="text-sm text-white">{caption}</p>
      </div>
    </div>
  );
};
export default Picture;
