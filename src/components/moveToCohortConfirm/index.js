import useDialog from '../../hooks/useDialog';
import Button from '../button';
import useModal from '../../hooks/useModal';
import { patch } from '../../service/apiClient';
import './style.css';

function MoveToCohortConfirm({ userToMoveId, newCohortId, onUserUpdate }) {
  const { closeModal } = useModal();
  const { closeDialog, showActionSuccessPopup } = useDialog();

  const cancel = () => {
    closeDialog();
  };

  const moveToCohort = async () => {
    try {
      const res = await patch('users/' + userToMoveId, { cohortId: newCohortId }, true);
      if (res !== 'success') {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
      if (onUserUpdate) onUserUpdate(userToMoveId); // refresh user data when cohort is updated
      showActionSuccessPopup('User moved', 4000);
      console.log('PATCH COHORT RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR PATCH COHORT:' + newCohortId + ', ' + err);
    }
    setTimeout(() => {
      closeDialog();
      closeModal();
    }, 300);
  };

  return (
    <div className="moveToCohort">
        <section className="moveToCohortButtons">
            <Button
            onClick={cancel}
            text="Cancel"
            className="dialogButton"
            classes="button offwhite"
            />
            <Button
            onClick={moveToCohort}
            text="Move user"
            className="dialogButton"
            classes="button offwhite"
            />
        </section>
    </div>
  );
}

export default MoveToCohortConfirm;
