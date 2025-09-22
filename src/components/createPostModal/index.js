import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import useAuth from '../../hooks/useAuth';
import { ProfileIconColor } from '../../userUtils/profileIconColor';

const CreatePostModal = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();

  const { loggedInUser } = useAuth();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const profileIconColor = ProfileIconColor(loggedInUser?.id || 0);

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

  const loggedInUserInitials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
          <p>{loggedInUserInitials}</p>
        </div>
        <div className="post-user-name">
          <p>{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default CreatePostModal;
