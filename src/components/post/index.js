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

const Post = ({ id, date, content, comments = [], likes = 0 }) => {
  const { openModal, setModal } = useModal();

  const [user, setUser] = useState(null);
  const [userInitials, setUserInitials] = useState([]);
  const { loggedInUser } = useAuth();

  const showModal = () => {
    setModal(
      'Edit post',
      <EditPostModal author={user} postAuthorInitials={userInitials} postContent={content} />
    );
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

  const loggedInUserInitials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  if (!user) return 'loading';
  return (
    user && (
      <Card>
        <article className="post">
          <section className="post-details">
            <ProfileCircle
              initials={userInitials}
              uniqueKey={'post' + id}
              role={user.role.toLowerCase()}
              userId={user.id}
            />

            <div className="post-user-name">
              <p>{`${user.firstName} ${user.lastName}`}</p>
              <small>{date}</small>
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
              <div>Like</div>
              <div>Comment</div>
            </div>

            <p>{!likes && 'Be the first to like this'}</p>
          </section>

          <section>
            {comments.map((comment, index) => (
              <>
                <div className="comment-detail" key={comment.id}>
                  <ProfileCircle
                    initials={comment.user}
                    uniqueKey={'comment' + comment.id + index}
                    role={comment.role}
                    userId={comment.user_id}
                  />
                  <div className="comment-container">
                    <Comment key={comment.id} name={comment.userId} content={comment.body} />
                  </div>
                </div>
              </>
            ))}
          </section>
          <section className="create-a-comment">
            <ProfileCircle
              initials={loggedInUserInitials}
              uniqueKey={'comment' + id + 'owninput'}
              role={loggedInUser.role.toLowerCase()}
              userId={loggedInUser.id}
            />
            <Button text="Add a comment..." />
          </section>
        </article>
      </Card>
    )
  );
};

export default Post;
