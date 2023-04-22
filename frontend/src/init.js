import App from './App';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { AuthProvider } from './chat/contexts/authContext';
import { SocketProvider } from './chat/contexts/socketContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './chat/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './chat/slices'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const init = async () => {
  const socket = io();

  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const rollbarConfig = {
    accessToken: 'f07d43bc445642aaade6840029af5082',
    environment: 'testenv',
  };

  return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store} >
            <RollbarProvider config={rollbarConfig}>
              <ErrorBoundary>
                <AuthProvider>
                  <SocketProvider socket={socket}>
                    <App />
                    <ToastContainer />
                  </SocketProvider>
                </AuthProvider>
                </ErrorBoundary>
            </RollbarProvider>
        </Provider>
      </I18nextProvider>
  )

}

export default init;