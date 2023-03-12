import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});
export default store;