import { useEffect, useState } from 'react';
import Button from '../button';
import Card from '../card';
import Comment from '../comment';
import ProfileCircle from '../profileCircle';
import './style.css';
import { get } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import PostOptionsMenu from '../postOptionsMenu/postOptionsMenu';

const Post = ({ id, name, date, content, comments = [], likes = 0 }) => {
  const [user, setUser] = useState(null);
  const [userInitials, setUserInitials] = useState([]);
  const { loggedInUser } = useAuth();

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
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
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
            <ProfileCircle
              initials={userInitials}
              uniqueKey={'post' + id}
              role={user.role.toLowerCase()}
              userId={user.id}
            />

            <div className="post-user-name">
              <p>{name}</p>
              <small>{formatDateTime(date)}</small>
            </div>

            <div className="edit-icon">
              <PostOptionsMenu uniqueKey={'postOptionsMenu' + id} postId={id} content={content} />
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
                    userId={comment.userId}
                  />
                  <div className="comment-container">
                    <Comment
                      key={comment.id}
                      name={`${comment.firstName} ${comment.lastName}`}
                      content={comment.body}
                    />
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
