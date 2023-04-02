import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/contexts';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ModalAddChanel = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const existingChannels = useSelector((state) => state.channels.channels).map(
    (channel) => channel.name
  );
  const modalAddChanelScheme = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(existingChannels, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const handleClose = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: modalAddChanelScheme,
    onSubmit: async ({ name }) => {
      try {
        const response =  await socket.addNewChannel({name})
        const id = response.data.id;
        dispatch(setCurrentChannelId(id));
        dispatch(closeModal());
      } catch (error) {
        inputRef.current.select();
      }
    },
  });
  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              id="addChannel"
              data-testid="addChannel"
              aria-label="Имя канала"
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              autoComplete="off"
              ref={inputRef}
              disabled={formik.isSubmitting}
              required
            />
            <Form.Label visuallyHidden="true" htmlFor="addChannel">
              Имя канала
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
          Отменить
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddChanel;
