import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { io } from 'socket.io-client';
import { AuthProvider } from './chat/contexts/authContext';
import { SocketProvider } from './chat/contexts/socketContext';

import { Provider } from 'react-redux';
import store from './chat/slices'

const runApp = () => {
  const socket = io();
  
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider store={store} >
      <AuthProvider>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </AuthProvider>
    </Provider>
  );

}

export default runApp;