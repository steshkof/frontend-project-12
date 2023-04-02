import ModalAddChanel from "./ModalAddChanel";
import ModalRemoveChannel from "./ModalRemoveChannel";
import { useSelector } from "react-redux";

const modalTypes = {
  add: ModalAddChanel,
  remove: ModalRemoveChannel,
}

const Modal = () => {
  const { isOpened, type } = useSelector((state) => state.modals);
  const OpenedModal = modalTypes[type];
  return isOpened && <OpenedModal />
}
export default Modal;