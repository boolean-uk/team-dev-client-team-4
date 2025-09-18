import { createContext, useState } from 'react';

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogComponent, setDialogComponent] = useState(null);
  const [dialogHeader, setDialogHeader] = useState(null);
  const [dialogMessage, setDialogMessage] = useState(null);

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

  const value = {
    isOpen,
    openDialog,
    closeDialog,
    setDialog,
    setDialogMessage,
    dialogComponent,
    dialogHeader,
    dialogMessage
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

export { DialogContext, DialogProvider };
