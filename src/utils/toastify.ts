import { Bounce, toast, ToastOptions } from 'react-toastify';

export const toastify = (type: 'warn' | 'error', text: string) => {
  const toastOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce
  };

  if (type === 'warn') {
    toast.warn(text, toastOptions);
  } else if (type === 'error') {
    toast.error(text, toastOptions);
  }
};
