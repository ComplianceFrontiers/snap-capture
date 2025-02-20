import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signin from './pages/signin/signin';
import Capturephoto from "./pages/capturePhoto/capturePhoto";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <POlicyAcknowledgement/> */}
    {/* <USerSelection /> */}
    <Capturephoto />
    {/* <App /> */}
  </React.StrictMode>
);
