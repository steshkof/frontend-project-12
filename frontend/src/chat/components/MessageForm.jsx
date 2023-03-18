import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';

import { addMessage } from '../slices/messagesSlice';
import images from '../images/images';

import { useAuth } from '../contexts/contexts';

const MessageForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const inputRef = useRef();
  const channelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  });

  const newMessageSheme = yup.object({
    newMessage: yup.string().trim().required('Введите сообщение'),
  });

  const formik = useFormik({
    initialValues: {
      newMessage: '',
    },
    validationSchema: newMessageSheme,
    onSubmit: (values, { resetForm }) => {
      const newMessage = {
        body: values.newMessage,
        channelId,
        username: user.username,
      };
      dispatch(addMessage(newMessage));
      resetForm();
    },
  });

  return (
    <Form
      className="py-1 border rounded-2"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <div className="input-group">
        <Form.Control
          className="border-0 p-0 ps-2"
          name="newMessage"
          id="newMessage"
          data-testid="newMessage"
          placeholder="Введите сообщение..."
          aria-label="Введите сообщение..."
          value={formik.values.newMessage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          ref={inputRef}
          required
        />
        <Button
          className="btn-group-vertical"
          type="submit"
          variant=""
          disabled={formik.isSubmitting}
        >
          <img src={images.send} alt="Отправить" />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;
