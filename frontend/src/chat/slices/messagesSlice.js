import { createSlice } from '@reduxjs/toolkit';
import { fetchFromServer, removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      state.messages.push(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromServer.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(removeChannel, (state, action) => {
        const idOfChannelToRemove = action.payload.id;
        state.messages = state.messages.filter((m) => m.channelId !== idOfChannelToRemove);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
