import { toast } from 'react-toastify';

const notify = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;

    case 'error':
      toast.error(message);
      break;

    default:
      toast(message);
      break;
  }
};

export default notify;
