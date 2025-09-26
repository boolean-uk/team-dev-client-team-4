import useDialog from '../../hooks/useDialog';
import Button from '../button';
import useModal from '../../hooks/useModal';
import { post } from '../../service/apiClient';
import './style.css';

function MoveToCohortConfirm({ userToMoveId, newCohortId, newCourseId, onUserUpdate }) {
  const { closeModal } = useModal();
  const { closeDialog, showActionSuccessPopup } = useDialog();

  const cancel = () => {
    closeDialog();
  };

  const moveToCohort = async () => {
    try {
      const res = await post(
        'cohortcourses/moveUser' + userToMoveId,
        { cohortId: newCohortId, courseId: newCourseId },
        true
      );
      if (res !== 'success') {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
      if (onUserUpdate) onUserUpdate(userToMoveId); // refresh user data when cohort is updated
      showActionSuccessPopup('User moved', 4000);
      console.log('COHORT COURSE MOVE USER RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR COHORT COURSE MOVE USER:' + newCohortId + ', ' + err);
    }
    setTimeout(() => {
      closeDialog();
      closeModal();
    }, 300);
  };

  return (
    <div className="moveToCohort">
      <section className="moveToCohortButtons">
        <Button onClick={cancel} text="Cancel" className="dialogButton" classes="button offwhite" />
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
