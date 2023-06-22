import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import myAudio from './mymusic.mp3'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <audio src={myAudio} autoPlay loop/>
  </React.StrictMode>
);


