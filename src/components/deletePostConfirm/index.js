import React from 'react';
import Button from '../button';
import './style.css';
import { deleteRequest } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

function DeletePostConfirm({ postId, refreshPosts }) {
  const { closeModal } = useModal();
  const { closeDialog, showActionSuccessPopup } = useDialog();

  const cancel = () => {
    closeModal();
    closeDialog();
  };

  const deletePost = async () => {
    try {
      const res = await deleteRequest('posts/' + postId, true);
      if (!res.status === 'success') {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
      showActionSuccessPopup('Post deleted', 4000);
    } catch (err) {
      console.log('ERROR ' + err);
    }

    setTimeout(() => {
      closeDialog();
    }, 300);

    refreshPosts();
  };

  return (
    <div className="deletePostConfirm">
      <section className="deletePostConfirmButtons">
        <Button onClick={cancel} text="Cancel" className="dialogButton" classes="button offwhite" />
        <Button
          onClick={deletePost}
          text="Delete Post"
          className="dialogButton"
          classes="button offwhite"
        />
      </section>
    </div>
  );
}

export default DeletePostConfirm;
