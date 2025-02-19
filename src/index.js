import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signin from './pages/signin/signin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <POlicyAcknowledgement/> */}
    {/* <USerSelection /> */}
    <Signin />
    {/* <App /> */}
  </React.StrictMode>
);
