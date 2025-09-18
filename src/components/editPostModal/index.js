import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';

const EditPostModal = ({ user, postAuthorInitials, postContent }) => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

  const postAuthor = user ? `${user.firstName} ${user.lastName}` : '';

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
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{postAuthorInitials}</p>
        </div>
        <div className="post-user-name">
          <p>{postAuthor}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={postContent} placeholder="Edit your post"></textarea>
      </section>

      <section className="create-post-actions">
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
