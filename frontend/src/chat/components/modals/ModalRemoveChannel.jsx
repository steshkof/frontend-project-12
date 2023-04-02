import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { useSocket } from '../../contexts/contexts';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const channelId = useSelector((state) => state.modals.channelId)

  const [isDeleting, setIsDeleting] = useState(false);
  const handleClose = () => dispatch(closeModal());

  const handleSubmit = async () => {
    try {
      setIsDeleting(true);
      await socket.removeChannel({id: channelId});
      dispatch(closeModal());
      setIsDeleting(false);
    } catch(error) {
      console.log('Remove channel error: ', error);
      setIsDeleting(false);
    }
  }

 
  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          Отменить
        </Button>
        <Button variant="danger" onClick={handleSubmit} disabled={isDeleting}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
