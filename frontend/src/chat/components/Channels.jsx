import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { setCurrentChannelId } from '../slices/channelsSlice'

const Channels = () => {
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const setCurrentChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  }

  const Channel = ( {channel, isActive, handleChoose} ) => {
    const buttonVariant = isActive ? 'secondary' : 'light';
    const button = (
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        onClick={handleChoose}
        variant={buttonVariant}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    );

    if (channel.removalbe) {
      return (
        <Dropdown as={ButtonGroup} className="d-flex">
          {button}
          <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic flex-grow-0">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="">Удалить</Dropdown.Item>
            <Dropdown.Item href="">Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return button;

  }

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <Nav className="px-2 flex-column" as="ul" variant="pills" fill>
        {channels.map((channel) => {
          return (
            <Nav.Item as="li" className="w-100" key={channel.id}>
              <Channel 
                channel={channel} 
                isActive={currentChannelId === channel.id}
                handleChoose={() => setCurrentChannel(channel.id)}
                ></Channel>
            </Nav.Item>
          )
        })}
      </Nav>
    </>
  );
};

export default Channels;
