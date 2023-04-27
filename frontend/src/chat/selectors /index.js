const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getChannels = (state) => state.channels.channels;

const getMessages = (state) => state.messages.messages;

const getModalOpenedState = (state) => state.modals.isOpened;
const getModalType = (state) => state.modals.type;
const getModalChannelId = (state) => state.modals.channelId;
const getModalChannelName = (state) => state.modals?.channelName;

export {
  getCurrentChannelId,
  getChannels,
  getModalOpenedState,
  getMessages,
  getModalType,
  getModalChannelId,
  getModalChannelName,
};
