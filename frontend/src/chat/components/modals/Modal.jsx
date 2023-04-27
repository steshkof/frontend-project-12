import { useSelector } from 'react-redux';
import ModalAddChanel from './ModalAddChanel';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';
import { getModalOpenedState, getModalType } from '../../selectors ';

const modalTypes = {
  add: ModalAddChanel,
  remove: ModalRemoveChannel,
  rename: ModalRenameChannel,
};

const Modal = () => {
  const isOpened = useSelector(getModalOpenedState);
  const type  = useSelector(getModalType);
  const OpenedModal = modalTypes[type];
  return isOpened && <OpenedModal />;
};

export default Modal;
