import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlayProvider from './context/PlayProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayProvider>
      <App />
    </PlayProvider>
  </React.StrictMode>,
);
