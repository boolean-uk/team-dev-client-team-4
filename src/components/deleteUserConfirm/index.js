import useDialog from '../../hooks/useDialog';
import Button from '../button';
import './style.css';
import useModal from '../../hooks/useModal';
import { deleteRequest } from '../../service/apiClient';

function DeleteUserConfirm({ userToDeleteId }) {
  const { closeModal } = useModal();
  const { closeDialog, showActionSuccessPopup } = useDialog();

  const cancel = () => {
    closeDialog();
  };

  const deleteUser = async () => {
    try {
      const res = await deleteRequest('users/' + userToDeleteId);
      if (res !== 'success') {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
      showActionSuccessPopup('User deleted', 4000);
      console.log('DELETE USER RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR DELETE USER ID:' + userToDeleteId + ', ' + err);
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

export default DeleteUserConfirm;
