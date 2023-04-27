import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../contexts/contexts';
import { closeModal } from '../../slices/modalsSlice';
import notify from '../../notifications';
import { getChannels, getModalChannelId, getModalChannelName } from '../../selectors ';

const ModalRenameChannel = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const existingChannels = useSelector(getChannels).map((c) => c.name);
  const channelId = useSelector(getModalChannelId);
  const channelName = useSelector(getModalChannelName);

  const modalAddChanelScheme = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.nameLength'))
      .max(20, t('modals.nameLength'))
      .notOneOf(existingChannels, t('modals.uniqueName'))
      .required(t('modals.required')),
  });

  const handleClose = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      name: channelName || '',
    },
    validationSchema: modalAddChanelScheme,
    onSubmit: async ({ name }) => {
      try {
        await socket.renameChannel({ id: channelId, name });
        notify('success', t('notifications.channelRenamed'));
        dispatch(closeModal());
      } catch (error) {
        inputRef.current.select();
      }
    },
  });
  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              id="addChannel"
              data-testid="addChannel"
              aria-label={t('modals.channelName')}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              autoComplete="off"
              ref={inputRef}
              disabled={formik.isSubmitting}
              required
            />
            <Form.Label visuallyHidden="true" htmlFor="addChannel">
              {t('modals.channelName')}
            </Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={formik.isSubmitting} onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {t('modals.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRenameChannel;
