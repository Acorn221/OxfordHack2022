import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Home from './Home';
import Profile from './Profile';
import Upload from './Upload';
import Auth0ProviderWithHistory from './auth0provider';
import AuthenticationButton from './authentication-button';
import Posts from './profile/Posts';
import Photos from './profile/Photos';
import Friends from './Friends';

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Routes>
          <Route exact path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="/profile/posts" element={<Posts />} />
              <Route path="/profile/photos" element={<Photos />} />
            </Route>
            <Route path="/upload" element={<Upload />} />
            <Route path="/friends" element={<Friends />} />
          </Route>
        </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};

export default App;
