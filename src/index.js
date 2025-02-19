import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signin from './pages/signin/signin'; // Corrected import
import CapturePhoto from "./pages/capturePhoto/capturePhoto";
import USerSelection from './pages/UserSelection/UserSelection';
import POlicyAcknowledgement from './pages/PolicyAcknowledgement/PolicyAcknowledgement';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <POlicyAcknowledgement/> */}
    {/* <USerSelection /> */}
    <CapturePhoto />
    {/* <App /> */}
  </React.StrictMode>
);
