import { toast } from 'react-hot-toast';

const errorNotify = (title: string) => {
  toast.error(title, {
    position: 'bottom-center',
  });
};

const successNotify = (title: string) => {
  toast.success(title, {
    position: 'bottom-center',
  });
};

export { errorNotify, successNotify };
