import { useState } from 'react';
import useModal from '../../hooks/useModal';
import Button from '../button';
import './style.css';

const EditPostModal = ({ author, postContent, postId }) => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState(postContent || '');

  const postAuthor = author ? `${author.firstName} ${author.lastName}` : '';
  const postAuthorInitials = author
    ? `${author.firstName.charAt(0)}${author.lastName.charAt(0)}`
    : '';

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    setMessage('Submit button was clicked! Closing modal in 2 seconds...');

    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 2000);
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
          onClick={onSubmit}
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
