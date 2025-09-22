import React, { useState, useEffect } from 'react';
import TickIcon from '../../assets/tickIcon';
import useDialog from '../../hooks/useDialog';
import './style.css';

function ActionSuccess() {
  const { actionSuccessPopup, handleCloseActionSuccessPopup } = useDialog(); // TODO move out

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (actionSuccessPopup) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        handleCloseActionSuccessPopup();
      }, actionSuccessPopup.duration);
      return () => clearTimeout(timer);
    }
  }, [actionSuccessPopup, handleCloseActionSuccessPopup]);

  if (!visible || !actionSuccessPopup) return null;

  return (
    <div className="actionSuccessPopup">
      <TickIcon />
      {actionSuccessPopup.message}
    </div>
  );
}

export default ActionSuccess;
