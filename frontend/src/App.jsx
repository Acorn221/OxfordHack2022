import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Home from './Home';
import Profile from './Profile';
import Upload from './Upload';
import Auth0ProviderWithHistory from './auth0provider';
import AuthenticationButton from './authentication-button';

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <AuthenticationButton />
        <Routes>
          <Route exact path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};

export default App;
