import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './chat/contexts/authContext';


import { Provider } from 'react-redux';
import store from '/home/steshkof/frontend-project-12/frontend/src/chat/slices/index.js'


const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store} >
      <AuthProvider>
        <App />
      </AuthProvider>
  </Provider>
);
