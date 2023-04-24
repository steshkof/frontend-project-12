import { useSelector } from 'react-redux';
import ModalAddChanel from './ModalAddChanel';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

const modalTypes = {
  add: ModalAddChanel,
  remove: ModalRemoveChannel,
  rename: ModalRenameChannel,
};

const Modal = () => {
  const { isOpened, type } = useSelector((state) => state.modals);
  const OpenedModal = modalTypes[type];
  return isOpened && <OpenedModal />;
};

export default Modal;
