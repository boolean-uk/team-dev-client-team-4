import React from 'react';
import Button from '../button';
import './style.css';
import { deleteRequest } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

function DeletePostConfirm({ postId }) {
  const { closeModal } = useModal();
  const { closeDialog } = useDialog();

  const cancel = () => {
    closeModal();
    closeDialog();
  };

  const deletePost = async () => {
    try {
      const res = await deleteRequest('posts/' + postId, true);
      if (!res.ok) {
        throw new Error(`HTTP error, status: ${res.status}`);
      }
    } catch (err) {
      console.log('ERROR ' + err);
    }

    setTimeout(() => {
      closeDialog();
    }, 2000);
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
