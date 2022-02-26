import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Home from './Home';
import Profile from './Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
