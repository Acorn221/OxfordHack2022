import React, { useEffect, useState } from 'react';
import Picture from './Picture';

import { useAuth0 } from '@auth0/auth0-react';
import Friends from './Friends';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth0();

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get('https://hack.djpiper28.co.uk/api/getfeed').then((response) => {
      setFeed(response.data);
    });
  }, []);

  const getPeopleInPicture = (usersArray) => {
    let subjects = '';
    for (let user of usersArray) {
      subjects += user['User_id'] + ' ';
    }
    return subjects;
  };

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-10 w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white">Recent Posts</h1>
        <div className="w-full px-4 flex flex-col justify-center items-center gap-16">
          {feed.map((item) => (
            <Picture
              key={item['Image_id']}
              photographer={item['User_name']}
              subject={getPeopleInPicture(item['In_image'])}
              pictureUrl={'https://hack.djpiper28.co.uk/cdn/' + item['Image_id'] + ".jpg"}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 h-full "></div>
    </div>
  );
};
export default Home;
