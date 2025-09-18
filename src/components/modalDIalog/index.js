import ReactModal from 'react-modal';
import useDialog from '../../hooks/useDialog';
import style from './style.js';
import './style.css';

ReactModal.setAppElement('#root');

const Dialog = ({ width = '612px' }) => {
  const { isOpen, dialogComponent, closeDialog } = useDialog();

  style.content.width = width;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeDialog} style={style}>
      <div className="modal-body">
        <section className="modal-content">{dialogComponent}</section>
      </div>
    </ReactModal>
  );
};

export default Dialog;
