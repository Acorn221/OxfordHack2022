import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Home from './Home';
import Profile from './Profile';
import Upload from './Upload';

import * as nearAPI from 'near-api-js';

const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
};

// connect to NEAR
const near = await connect(config);

// create wallet connection
const wallet = new WalletConnection(near);
const signIn = () => {
  wallet.requestSignIn({
    contractId: 'example-contract.testnet', // optional, contract requesting access
    methodNames: ['hello', 'goodbye'], // optional
    successUrl: 'http://localhost:3000', // optional
    failureUrl: 'http://localhost:3000', // optional
  });
};

if (!wallet.isSignedIn()) signIn();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
