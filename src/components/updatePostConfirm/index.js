import React from 'react';
import Button from '../button';
import './style.css';
import { patch } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

function UpdatePostConfirm({ postId }) {
  const { closeModal } = useModal();
  const { closeDialog } = useDialog();

  const dontSave = () => {
    closeModal();
    closeDialog();
  };

  const cancel = () => {
    closeDialog();
  };

  const updatePost = async () => {
    await patch('/posts/' + postId, true);

    // todo process response
    setTimeout(() => {
      closeDialog();
    }, 2000);
  };

  return (
    <div className="updatePostConfirm">
      <section className="updatePostConfirmButtons">
        <Button onClick={dontSave} text="Don't save" className="dialogButton" classes="button offwhite"/>
        <Button onClick={cancel} text="Cancel" className="dialogButton" classes="button offwhite"/>
        <Button onClick={updatePost} text="Save & update" className="dialogButton" classes="button offwhite"/>
      </section>
    </div>
  );
}

export default UpdatePostConfirm;
