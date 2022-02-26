import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { uploadURL } from './variables';
import { v4 as uuidv4 } from 'uuid';

const DropArea = () => {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = (files) => {
    console.log(files);
    //var formData = new FormData();
    //formData.append('file', files[0]);

    fetch(uploadURL, {
      method: 'POST',
      body: files[0],
      headers: {
        'img-id': uuidv4(),
      },
    });
  };
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps({ className: 'px-64 dropzone h-3/4 hover:shadow-l hover:wiggle shadow-white drop-shadow-xl' })}>
          <input {...getInputProps()} />
          <p className="text-black text-center ring-offset-red-700 bg-white margin place-content-center h-4/5 flex items-center">
            Drop your image here or click here to upload it!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 align-center m-5 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </p>
        </div>
      )}
    </Dropzone>
  );
};

export default DropArea;
