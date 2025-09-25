import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import useAuth from '../../hooks/useAuth';
import { post } from '../../service/apiClient';
import { ProfileIconColor } from '../../userUtils/profileIconColor';
import useDialog from '../../hooks/useDialog';

const CreatePostModal = (props) => {
  const { closeModal } = useModal();
  const { loggedInUser } = useAuth();
  const { refreshPosts } = props;
  const { showActionSuccessPopup } = useDialog();

  const profileIconColor = ProfileIconColor(loggedInUser?.id || 0);

  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const loggedInUserInitials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = async () => {
    const postRequest = {
      author_id: loggedInUser.id,
      body: message,
      created_at: new Date().toISOString()
    };

    try {
      const createdPost = await post('posts', postRequest, true);
      setShowError(createdPost.status !== 'success');

      if (createdPost.status !== 'success') {
        setShowError(true);
      } else {
        showActionSuccessPopup('Posted', 4000);
        console.log(createdPost);
        refreshPosts();
        closeModal();
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

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
                <textarea onChange={onChange} value={message} placeholder="What's on your mind?"></textarea>
            </section>
            {
                showError && (
                    <section>
                        <text className="create-error"> Failed to create post! Please try again...</text>
                    </section>
                )
            }

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
