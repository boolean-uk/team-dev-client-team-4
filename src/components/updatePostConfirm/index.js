import React from 'react';
import Button from '../button';
import './style.css';
import { patch } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

function UpdatePostConfirm({ postId, text }) {
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
    try {
      const res = await patch('posts/' + postId, { body: text }, true);
      if (!res.ok) {
        throw new Error(`HTTP error, status: ${res.status}`);
      }

      console.log('EDIT POST RESPONSE: ' + res);
    } catch (err) {
      console.log('ERROR EDIT POSTID:' + postId + ', ' + err);
    }
    setTimeout(() => {
      closeDialog();
      closeModal();
    }, 300);
  };

  return (
    <div className="updatePostConfirm">
      <section className="updatePostConfirmButtons">
        <Button
          onClick={dontSave}
          text="Don't save"
          className="dialogButton"
          classes="button offwhite"
        />
        <Button onClick={cancel} text="Cancel" className="dialogButton" classes="button offwhite" />
        <Button
          onClick={updatePost}
          text="Save & update"
          className="dialogButton"
          classes="button offwhite"
        />
      </section>
    </div>
  );
}

export default UpdatePostConfirm;
