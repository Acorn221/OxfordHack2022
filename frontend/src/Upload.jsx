import React, { useState } from 'react';
import Dropzone from './DropArea';

const Upload = () => {
  const [userId, setUserId] = useState('44441');

  return (
    <div className="w-full h-screen">
      <input type="text" label="Userid" onChange={(e) => setUserId(e.target.value)} />
      <h1 className="text-2xl text-white">Upload image: </h1>
      <Dropzone userId={userId} />
    </div>
  );
};
export default Upload;
