import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';

const ChatRoom = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state
    .messages
    .messages
    .filter((message) => message.channelId === currentChannelId));
  const messagesCount = messages.length;
  const currentChannelName = useSelector((state) => state.channels.channels
    .find(({ id }) => id === currentChannelId)?.name);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{ t('chatroom.messagesCounter.messagesCount', { count: messagesCount }) }</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
