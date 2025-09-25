import React from 'react';
import Button from '../button';
import './style.css';
import { patch } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

function UpdateCommentConfirm({ commentId, text, refreshPosts }) {
  const { closeModal } = useModal();
  const { closeDialog, showActionSuccessPopup } = useDialog();

  const dontSave = () => {
    closeModal();
    closeDialog();
  };

  const cancel = () => {
    closeDialog();
  };

  const updateComment = async () => {
    try {
      const res = await patch('comments/' + commentId, { body: text }, true);
      if (!res.status === 'success') {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
      showActionSuccessPopup('Comment updated', 4000);
      console.log('EDIT POST RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR EDIT POSTID:' + commentId + ', ' + err);
    }

    setTimeout(() => {
      closeDialog();
      closeModal();
    }, 300);

    refreshPosts();
  };

  return (
    <div className="updateCommentConfirm">
      <section className="updateCommentConfirmButtons">
        <Button
          onClick={dontSave}
          text="Don't save"
          className="dialogButton"
          classes="button offwhite"
        />
        <Button onClick={cancel} text="Cancel" className="dialogButton" classes="button offwhite" />
        <Button
          onClick={updateComment}
          text="Save & update"
          className="dialogButton"
          classes="button offwhite"
        />
      </section>
    </div>
  );
}

export default UpdateCommentConfirm;
