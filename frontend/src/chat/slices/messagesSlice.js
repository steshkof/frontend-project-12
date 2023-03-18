import { createSlice } from '@reduxjs/toolkit';

const randomId = () => Date.now();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      newMessage.id = randomId();
      console.log(newMessage);
      state.messages.push(newMessage); 
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
