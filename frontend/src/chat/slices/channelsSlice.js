import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchFromServer = createAsyncThunk(
  'channels/fetchFromServer',
  async (headers) => {
    const response = await axios.get(routes.apiRequests.getData, { headers });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    defaultChannelId: null,
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      const idOfChannelToRemove = action.payload.id;
      state.channels = state.channels.filter((channel) => channel.id !== idOfChannelToRemove);
      if (state.currentChannelId === idOfChannelToRemove) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const targetChannel = state.channels.find((channel) => channel.id === id);
      console.log('targetChannel', targetChannel);
      targetChannel.name = name;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromServer.fulfilled, (state, action) => {
        const { channels } = action.payload;
        state.channels = channels;
        state.defaultChannelId = action.payload.currentChannelId;
        state.currentChannelId = action.payload.currentChannelId;
      });
  },
});

export const {
  addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
