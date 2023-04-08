import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { useSocket } from '../../contexts/contexts';

import { useTranslation } from 'react-i18next';
import notify from '../../notifications';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const channelId = useSelector((state) => state.modals.channelId)
  const { t } = useTranslation();

  const [isDeleting, setIsDeleting] = useState(false);
  const handleClose = () => dispatch(closeModal());

  const handleSubmit = async () => {
    try {
      setIsDeleting(true);
      await socket.removeChannel({id: channelId});
      dispatch(closeModal());
      setIsDeleting(false);
      notify('success', t('notifications.channelRemoved'))
    } catch(error) {
      console.log('Remove channel error: ', error);
      setIsDeleting(false);
    }
  }

 
  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modals.areYouSure')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleSubmit} disabled={isDeleting}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
