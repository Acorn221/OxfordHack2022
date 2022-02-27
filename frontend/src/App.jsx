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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51KXbG8IsXbmSsTOgKUpvWpDTPqN0e4ylMhtQYGq0AhT26vR7n4uBFXp6dw99Hy3LdiMRrlh0ruZhk3CfWhiq9nyg00AwDEsHfx'
);

const App = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      'sk_test_51KXbG8IsXbmSsTOgIY0L2ZoLeanBtKSAryAedetYxFgvjCCj12pIg01IL6Wk2m5s94hzScNn5PaLrjYYaxAhak8D00KrFExgcE',
  };

  return (
    <BrowserRouter>
      <Elements stripe={stripePromise} options={options}>
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
      </Elements>
    </BrowserRouter>
  );
};

export default App;
