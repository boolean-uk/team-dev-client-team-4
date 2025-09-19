import { useContext } from 'react';
import { DialogContext } from '../context/dialog';

const useDialog = () => {
  return useContext(DialogContext);
};

export default useDialog;
