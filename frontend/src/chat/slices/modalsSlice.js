import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpened: false,
    type: null,
    channelId: null
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpened = true; 
      state.type = action.payload.type;
      state.channelId = action.payload.channelId;
    },
    closeModal: (state) => {
      state.isOpened = false; 
      state.channelId = null;
    }
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
