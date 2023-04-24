/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpened: false,
    type: null,
    channelId: null,
    channelName: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpened = true;
      state.type = action.payload.type;
      state.channelId = action.payload.channelId;
      if (action.payload?.channelName) state.channelName = action.payload.channelName;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.channelId = null;
      state.channelName = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
