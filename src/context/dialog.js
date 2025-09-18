import { createContext, useState } from 'react';

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogComponent, setDialogComponent] = useState(null);
  const [dialogHeader, setDialogHeader] = useState(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const setDialog = (header, component) => {
    setDialogHeader(header);
    setDialogComponent(component);
  };

  const value = {
    isOpen,
    openDialog,
    closeDialog,
    setDialog,
    dialogComponent,
    dialogHeader
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

export { DialogContext, DialogProvider };
