import React from 'react';

const Picture = ({ subject, photographer, pictureUrl, caption }) => {
  return (
    <div className="w-full max-w-5xl h-full max-h-96 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col my-4">
        <p className="text-5xl text-white">{subject}</p>
        <p className="text-5xl text-white">Taken by: {photographer}</p>
      </div>
      <img className="object-contain" src={pictureUrl} />
      <div className="w-full">
        <p className="text-3xl text-white">{caption}</p>
      </div>
    </div>
  );
};
export default Picture;
