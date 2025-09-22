import { createContext, useState } from 'react';

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogComponent, setDialogComponent] = useState(null);
  const [dialogHeader, setDialogHeader] = useState(null);
  const [dialogMessage, setDialogMessage] = useState(null);

  const [actionSuccessPopup, setActionSuccessPopup] = useState({ message: '', duration: 0 });

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const setDialog = (header, component, message) => {
    setDialogHeader(header);
    setDialogComponent(component);
    setDialogMessage(message);
  };

  // action success popup
  const showActionSuccessPopup = (message, duration = 3000) => {
    setActionSuccessPopup({ message, duration });
  };

  const handleCloseActionSuccessPopup = () => {
    setActionSuccessPopup(null);
  };

  const value = {
    isOpen,
    openDialog,
    closeDialog,
    setDialog,
    setDialogMessage,
    actionSuccessPopup,
    showActionSuccessPopup,
    handleCloseActionSuccessPopup,
    dialogComponent,
    dialogHeader,
    dialogMessage
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

export { DialogContext, DialogProvider };
