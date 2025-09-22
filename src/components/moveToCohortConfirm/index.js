import useDialog from '../../hooks/useDialog';
import Button from '../button';
import useModal from '../../hooks/useModal';
import { patch } from '../../service/apiClient';
import './style.css';

const MoveToCohortConfirm = ({ studentId, cohortId }) => {
  const { closeModal } = useModal();
  const { closeDialog } = useDialog();

  const cancel = () => {
    closeDialog();
  };

  const moveToCohort = async () => {
    try {
      const res = await patch('users/' + studentId, { cohortId }, true);
      if (!res.ok) {
        throw new Error(`HTTP error, status: ${res.status}`);
      }

      console.log('PATCH COHORT RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR PATCH COHORT:' + cohortId + ', ' + err);
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
