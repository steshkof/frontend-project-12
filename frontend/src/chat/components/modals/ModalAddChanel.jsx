import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeModal } from '../../slices/modalsSlice';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/contexts';

import notify from '../../notifications';

const ModalAddChanel = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const existingChannels = useSelector((state) => state.channels.channels).map((c) => c.name);
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
      name: '',
    },
    validationSchema: modalAddChanelScheme,
    onSubmit: async ({ name }) => {
      try {
        const response = await socket.addNewChannel({ name });
        const { id } = response.data;
        dispatch(setCurrentChannelId(id));
        dispatch(closeModal());
        notify('success', t('notifications.channelCreated'));
      } catch (error) {
        inputRef.current.select();
      }
    },
  });
  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              id="addChannel"
              data-testid="addChannel"
              aria-label={t('modals.addChannel')}
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

export default ModalAddChanel;
