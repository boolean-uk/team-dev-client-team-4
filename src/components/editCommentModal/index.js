import { useState } from 'react';
import useDialog from '../../hooks/useDialog';
import Button from '../button';
import UpdateCommentConfirm from '../updateCommentConfirm';
import './style.css';
import { ProfileIconColor } from '../../userUtils/profileIconColor';

const EditCommentModal = ({ author, commentContent, commentId, refreshPosts }) => {
  const { setDialog, openDialog } = useDialog();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState(commentContent || '');
  const profileIconColor = ProfileIconColor(author?.id || 0);

  const commentAuthor = author ? `${author.firstName} ${author.lastName}` : '';
  const commentAuthorInitials = author
    ? `${author.firstName.charAt(0)}${author.lastName.charAt(0)}`
    : '';

  const onChange = (e) => {
    setText(e.target.value);
  };

  const showUpdateDialog = () => {
    setDialog(
      'Save and update your comment?',
      <UpdateCommentConfirm commentId={commentId} text={text} refreshPosts={refreshPosts}/>,
      'Do you want to save the updates to your comment?'
    );
    openDialog();
  };

  return (
    <>
      <section className="edit-comment-user-details">
        <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
          <p>{commentAuthorInitials}</p>
        </div>
        <div className="comment-user-name">
          <p>{commentAuthor}</p>
        </div>
      </section>

      <section>
        <textarea
          onChange={onChange}
          value={text}
          placeholder={commentContent || "What's on your mind?"}
        ></textarea>
      </section>

      <section className="edit-comment-actions">
        <Button
          onClick={showUpdateDialog}
          text="Update Comment"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditCommentModal;
