import useDialog from '../../hooks/useDialog';
import Button from '../button';
import './style.css';
import useModal from '../../hooks/useModal';
import { deleteRequest } from '../../service/apiClient';

const DeleteStudentModal = ({ studentId }) => {
  const { closeModal } = useModal();
  const { closeDialog } = useDialog();

  const cancel = () => {
    closeDialog();
  };

  const deleteUser = async () => {
    try {
      const res = await deleteRequest('students/' + studentId);
      if (!res.ok) {
        throw new Error(`HTTP error, status: ${res.status}`);
      }

      console.log('DELETE STUDENT RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR DELETE STUDENTID:' + studentId + ', ' + err);
    }
    setTimeout(() => {
      closeDialog();
      closeModal();
    }, 300);
  };

  return (
    <div className="deleteUser">
      <section className="deleteUserButtons">
        <Button
          onClick={cancel}
          text="Cancel"
          className="dialogButton"
          classes="button offwhite"
        />
        <Button
          onClick={deleteUser}
          text="Delete User"
          className="dialogButton"
          classes="button offwhite"
        />
      </section>
    </div>
  );
}

export default DeleteStudentModal;
