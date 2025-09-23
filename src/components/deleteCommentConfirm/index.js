import React from 'react';
import Button from '../button';
import './style.css';
import { deleteRequest } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

function DeleteCommentConfirm({ commentId, refreshPosts }) {
  const { closeModal } = useModal();
  const { closeDialog, showActionSuccessPopup } = useDialog();

  const cancel = () => {
    closeModal();
    closeDialog();
  };

  const deleteComment = async () => {
    try {
      const res = await deleteRequest('comments/' + commentId, true);
      if (!res.status === 'success') {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
      showActionSuccessPopup('Deleted', 4000);
    } catch (err) {
      console.log('ERROR ' + err);
    }

    setTimeout(() => {
      closeDialog();
    }, 300);

    refreshPosts();
  };

  return (
    <div className="deleteCommentConfirm">
      <section className="deleteCommentConfirmButtons">
        <Button onClick={cancel} text="Cancel" className="dialogButton" classes="button offwhite" />
        <Button
          onClick={deleteComment}
          text="Delete Comment"
          className="dialogButton"
          classes="button offwhite"
        />
      </section>
    </div>
  );
}

export default DeleteCommentConfirm;
