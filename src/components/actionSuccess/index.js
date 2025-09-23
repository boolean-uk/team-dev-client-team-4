import React, { useState, useEffect } from 'react';
import TickIcon from '../../assets/tickIcon';
import useDialog from '../../hooks/useDialog';
import './style.css';

function ActionSuccess() {
  const { actionSuccessPopup, handleCloseActionSuccessPopup } = useDialog();

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
      <TickIcon height={32} width={32} />
      <h5>{actionSuccessPopup.message}</h5>
    </div>
  );
}

export default ActionSuccess;
