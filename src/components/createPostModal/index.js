import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import useAuth from '../../hooks/useAuth';
import { post } from '../../service/apiClient';

const CreatePostModal = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();

  const { loggedInUser } = useAuth();
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = async () => {
    console.log(message);
    const postRequest = {
      author_id: loggedInUser.id,
      body: message,
      created_at: '2025-09-18T13:36:06.242Z'
    };

    const createdPost = await post('posts/', postRequest, true);
    const data = createdPost.data;
    // const data = createdPost.json();
    console.log(data);

    closeModal();
    // setTimeout(() => {
    //   setMessage(null);
    //   closeModal();
    // }, 2000);
  };

  const loggedInUserInitials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{loggedInUserInitials}</p>
        </div>
        <div className="post-user-name">
          <p>{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={message} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${message.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!message.length}
        />
      </section>
    </>
  );
};

export default CreatePostModal;
