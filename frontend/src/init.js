/* eslint-disable react/react-in-jsx-scope */
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import * as leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import resources from './chat/i18n/resources/index.js';
import App from './App';
import { AuthProvider } from './chat/contexts/authContext';
import { SocketProvider } from './chat/contexts/socketContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './chat/slices';
import 'react-toastify/dist/ReactToastify.css';

const init = async () => {
  const socket = io();

  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'testenv',
  };

  const i18nextInstance = i18next.createInstance();
  i18nextInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
    });

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <I18nextProvider i18n={i18nextInstance}>
      <Provider store={store}>
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
  );
};

export default init;
