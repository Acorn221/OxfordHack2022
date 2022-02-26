import React from 'react';
import Dropzone from './DropArea';

const Upload = () => {
  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl text-white">Upload image: </h1>
      <Dropzone />
    </div>
  );
};
export default Upload;
