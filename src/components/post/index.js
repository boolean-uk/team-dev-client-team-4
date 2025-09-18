import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import Button from '../button';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import './style.css';
import { get } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import { FiHeart } from 'react-icons/fi';
import { MdOutlineInsertComment } from 'react-icons/md';

const Post = ({ id, name, date, content, comments = [], likes = 0 }) => {
  const { openModal, setModal } = useModal();

  const [user, setUser] = useState([]);
  const [userInitials, setUserInitials] = useState([]);
  const { loggedInUser } = useAuth();

  const showModal = () => {
    setModal('Edit post', <EditPostModal />);
    openModal();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await get(`users/${id}`).then((result) => result.data);
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const name = `${user.firstName} ${user.lastName}`;
    setUserInitials(name.match(/\b(\w)/g));
  }, [user]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} at ${hours}:${minutes}`;
  };

  const loggedInUserInitials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  if (!user) return 'loading';
  return (
    user && (
      <Card>
        <article className="post">
          <section className="post-details">
            <ProfileCircle initials={userInitials} id={'post' + id} />

            <div className="post-user-name">
              <p>{name}</p>
              <small>{formatDateTime(date)}</small>
            </div>

            <div className="edit-icon">
              <p onClick={showModal}>...</p>
            </div>
          </section>

          <section className="post-content">
            <p>{content} </p>
          </section>

          <section
            className={`post-interactions-container border-top ${comments.length ? 'border-bottom' : null}`}
          >
            <div className="post-interactions">
              <div className='interaction'>
                <FiHeart className='heart-icon'/>
                <div className='interaction-text'>Like </div>
              </div>
              <div className='interaction'>
                <MdOutlineInsertComment className='comment-icon'/>
                <div className='interaction-text'>Comment</div>
              </div>
            </div>

            <p className='interaction-text'>{!likes && 'Be the first to like this'}</p>
          </section>

          <section>
            {comments.map((comment, index) => (
              <>
                <div className="comment-detail" key={comment.id}>
                  <ProfileCircle initials={`${comment.firstName?.[0] ?? ''}${comment.lastName?.[0] ?? ''}`.toUpperCase()} id={'comment' + comment.id + index} />
                  <div className="comment-container">
                    <Comment key={comment.id} name={`${comment.firstName} ${comment.lastName}`} content={comment.body} />
                  </div>
                </div>
              </>
            ))}
          </section>
          <section className="create-a-comment">
            <ProfileCircle initials={loggedInUserInitials} id={'comment' + id + 'owninput'} />
            <Button text="Add a comment..." />
          </section>
        </article>
      </Card>
    )
  );
};

export default Post;
