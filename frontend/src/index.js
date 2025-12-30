import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker devre dışı bırakıldı (İnternet erişim hatalarını önlemek için)
/*
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
*/

