import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsReducer from './modalsSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
