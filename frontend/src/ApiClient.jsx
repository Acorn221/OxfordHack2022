import axios from 'axios';

const serverUrl = 'http://localhost:5002/';

const getFeed = () => {
  return axios.get('/api/getfeed');
};

const postProfilePic = (userId) => {};
