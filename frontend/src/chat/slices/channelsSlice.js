import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';
import axios from 'axios';

export const fetchFromServer = createAsyncThunk(
  'channels/fetchFromServer',
  async (headers) => {
    const response = await axios.get(routes.apiRequests.getData, { headers })
    const channels = response.data.channels;
    return channels;
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null
  },
  reducers: {
    addChannels: (state, action) => {
      state.channels = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromServer.fulfilled, (state, action) => {
        const channels = action.payload;
        state.channels = channels;
        state.currentChannelId = channels[0].id;
      });
  },
});

export const { addChannels, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
