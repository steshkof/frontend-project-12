import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';
import axios from 'axios';

export const fetchFromServer = createAsyncThunk(
  'channels/fetchFromServer',
  async (headers) => {
    const response = await axios.get(routes.apiRequests.getData, { headers })
    console.log(response.data);
    return response.data;
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    currentChannelDefaultId: null
  },
  reducers: {
    addChannel: (state, action) => {
        state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      const idOfChannelToRemove = action.payload.id;
      state.channels = state.channels.filter(channel => channel.id !== idOfChannelToRemove);
      if(state.currentChannelId === idOfChannelToRemove) {
        state.currentChannelId = state.currentChannelDefaultId;
      }
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromServer.fulfilled, (state, action) => {
        const channels = action.payload.channels;
        state.channels = channels;
        state.currentChannelDefaultId = action.payload.currentChannelId;
        state.currentChannelId = action.payload.currentChannelId;
      });
  },
});

export const { addChannel, removeChannel, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
