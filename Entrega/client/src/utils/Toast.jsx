import { toast } from 'react-toastify'

export const showSuccessNotification = (message) => {
  console.log('Lllego', message);
  toast.success(message)
}

export const showErrorNotification = (message) => {
  console.log('Lllego', message);
  toast.error(message)
}
