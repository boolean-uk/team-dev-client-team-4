import { useState } from 'react';
import useDialog from '../../hooks/useDialog';
import Button from '../button';
import UpdatePostConfirm from '../updatePostConfirm';
import './style.css';

const EditPostModal = ({ author, postContent, postId }) => {
  const { setDialog, openDialog } = useDialog();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState(postContent || '');

  const postAuthor = author ? `${author.firstName} ${author.lastName}` : '';
  const postAuthorInitials = author
    ? `${author.firstName.charAt(0)}${author.lastName.charAt(0)}`
    : '';

  const onChange = (e) => {
    setText(e.target.value);
  };

  const showUpdateDialog = () => {
    setDialog(
      'Save and update your post?',
      <UpdatePostConfirm postId={postId} />,
      'Do you want to save the updates to your post?'
    );
    openDialog();
  };

  return (
    <>
      <section className="edit-post-user-details">
        <div className="profile-icon">
          <p>{postAuthorInitials}</p>
        </div>
        <div className="post-user-name">
          <p>{postAuthor}</p>
        </div>
      </section>

      <section>
        <textarea
          onChange={onChange}
          value={text}
          placeholder={postContent || "What's on your mind?"}
        ></textarea>
      </section>

      <section className="edit-post-actions">
        <Button
          onClick={showUpdateDialog}
          text="Update Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditPostModal;
