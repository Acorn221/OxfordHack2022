import React from 'react';
import Dropzone from './DropArea'

const Upload = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl text-white">Upload image: </h1>
      <Dropzone className="h-full"/>
    </div>
  );
};
export default Upload;
