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
    await deleteRequest('/posts/' + postId, true);

    // todo process response
    setTimeout(() => {
      closeDialog();
    }, 2000);
  };

  return (
    <div className="deletePostConfirm">
      <section className="deletePostConfirmButtons">
        <Button onClick={cancel} text="Cancel" />
        <Button onClick={deletePost} text="Delete Post" />
      </section>
    </div>
  );
}

export default DeletePostConfirm;
