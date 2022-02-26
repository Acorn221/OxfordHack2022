import React from 'react';
import FriendCard from './FriendCard';

const Friends = () => {
  return (
    <div className="mt-8 w-full h-full grid grid-cols-3 gap-4 justify-items-center p-4">
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
};
export default Friends;
