import ReactModal from 'react-modal';
import useDialog from '../../hooks/useDialog';
import style from './style.js';
import './style.css';

ReactModal.setAppElement('#root');

const Dialog = ({ width = '612px' }) => {
  const { isOpen, dialogComponent, closeDialog, dialogHeader, dialogMessage } = useDialog();

  style.content.width = width;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeDialog} style={style}>
      <div className="modal-body">
        <section className="modal-content">
          <h4>{dialogHeader}</h4>
          <p>{dialogMessage}</p>
          {dialogComponent}
          </section>
      </div>
    </ReactModal>
  );
};

export default Dialog;
