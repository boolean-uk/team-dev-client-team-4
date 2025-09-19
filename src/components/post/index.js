import { useEffect, useState, useRef } from 'react';
import useModal from '../../hooks/useModal';
import Button from '../button';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import './style.css';
import { get, post } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineInsertComment, MdInsertComment } from 'react-icons/md';
import TextInput from '../form/textInput';
import SendIcon from '../../assets/icons/sendIcon';

const Post = ({ id, postId, name, date, content, comments = [], likes = 0, onCommentAdded }) => {
  const { openModal, setModal } = useModal();

  const [user, setUser] = useState(null);
  const [userInitials, setUserInitials] = useState([]);
  const [liked, setLiked] = useState(false);
  const [allComments, setAllComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const { loggedInUser } = useAuth();
  const commentsContainerRef = useRef(null);

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

  useEffect(() => {
    if (showComments && commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [showComments, allComments, comments]);

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

  const handleClick = () => {
    setLiked(!liked);
  };

  const viewComments = () => {
    setShowComments(!showComments);
    console.log(`Comments: ${showComments}`);
  };

  const handleSend = async () => {
    if (!commentContent.trim()) return;

    try {
      const response = await post(`posts/${postId}/comments`, {
        body: commentContent
      });

      console.log('Comment sent:', response);
      setCommentContent('');

      onCommentAdded();
    } catch (error) {
      console.error('Error while sending comment:', error);
    }
  };

  const seeAllComments = () => {
    setAllComments(!allComments);
  }

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
              <p onClick={showModal}>...</p>
            </div>
          </section>

          <section className="post-content">
            <p>{content} </p>
          </section>

          <section
            className={`post-interactions-container border-top ${comments.length && showComments ? 'border-bottom' : null}`}
          >
            <div className="post-interactions">
              <div className='interaction'>
              <Button onClick={handleClick} classes='iconbutton'>
                {liked
                  ? (
                  <FaHeart className='icon liked' />
                    )
                  : (
                  <FiHeart className='icon not-liked' />
                    )}
              </Button>
                <div className='interaction-text'>Like ({likes})</div>
              </div>
              <div className='interaction'>
                <Button onClick={viewComments} classes={`iconbutton ${showComments ? 'active' : ''}`}>
                  {showComments
                    ? (
                  <MdInsertComment className='icon show-comments'/>
                      )
                    : (
                  <MdOutlineInsertComment className='icon not-show-comments'/>
                      )}
                  <div className='interaction-text'>Comment ({comments.length})</div>
                </Button>
              </div>
            </div>
            <div className="interaction">
              <p className="interaction-text">
                {!likes && 'Be the first to like this'}
              </p>
            </div>
          </section>

          {showComments && (
            <section>
              { comments.length > 3 &&
                <div className="interaction">
                  <button className="see-previous-comments" onClick={seeAllComments}>{!allComments ? 'See previous comments' : 'See less comments'}</button>
                </div>
              }
              <div className="post-comments" ref={commentsContainerRef}>
                {(allComments ? comments : comments.slice(-3)).map((comment, index) => (
                  <>
                    <div className="comment-detail" key={comment.id}>
                      <ProfileCircle
                        initials={`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                        uniqueKey={'comment' + comment.id + index}
                        role={comment.role}
                        userId={comment.userId}
                      />
                      <div className="comment-container">
                        <Comment key={comment.id} name={`${comment.firstName} ${comment.lastName}`} content={comment.body} />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </section>
          )}

          <section className="create-a-comment">
            <ProfileCircle
              initials={loggedInUserInitials}
              uniqueKey={'comment' + id + 'owninput'}
              role={loggedInUser.role.toLowerCase()}
              userId={loggedInUser.id}
            />
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}>
              <TextInput
                value={commentContent}
                name="commentContent"
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Add a comment..."
                actionIcon={<SendIcon />}
                onActionClick={handleSend}
              />
            </form>
          </section>
        </article>
      </Card>
    )
  );
};

export default Post;
