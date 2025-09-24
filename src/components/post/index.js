import { useEffect, useState, useRef } from 'react';
import Button from '../button';
import Card from '../card';
import Comment from '../comment';
import ProfileCircle from '../profileCircle';
import './style.css';
import { get, post } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import PostOptionsMenu from '../postOptionsMenu/postOptionsMenu';
import CommentOptionsMenu from '../commentOptionsMenu/commentOptionsMenu';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineInsertComment, MdInsertComment } from 'react-icons/md';
import TextInput from '../form/textInput';
import SendIcon from '../../assets/icons/sendIcon';

const Post = ({ id, authorId, name, date, edited, content, comments = [], likes, refreshPosts, listIndex }) => {
  const [user, setUser] = useState(null);
  const [userInitials, setUserInitials] = useState([]);
  const [liked, setLiked] = useState(false);
  const [allComments, setAllComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const { loggedInUser } = useAuth();
  const commentsContainerRef = useRef(null);
  const likeCount =
    typeof likes === 'number'
      ? likes
      : Array.isArray(likes)
        ? likes.length
        : (likes?.count ?? likes?.likeCount ?? 0);

  useEffect(() => {
    const fetchUser = async () => {
      if (authorId) {
        try {
          const fetchedUser = await get(`users/${authorId}`).then((result) => result.data);
          setUser(fetchedUser);
          return;
        } catch (e) {
        }
      }
      if (!authorId && name) {
        const parts = String(name).split(' ');
        const firstName = parts[0] ?? '';
        const lastName = parts.slice(1).join(' ') ?? '';
        setUser({ id: 0, firstName, lastName, role: 'student' });
      }
    };
    fetchUser();
  }, [authorId, name]);

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

  useEffect(() => {
    if (loggedInUser && Array.isArray(likes)) {
      const hasLiked = likes.some((like) => like.userId === loggedInUser.id);
      setLiked(hasLiked);
    }
  }, [likes, loggedInUser]);

  const fetchUser = async () => {
    try {
      const updatedUser = await get(`users/${authorId}`).then(res => res.data);
      setUser(updatedUser);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

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

  const handleClick = async () => {
    try {
      const response = await post(`likes/${id}`, {});
      console.log('Like toggled:', response);

      refreshPosts();
    } catch (error) {
      console.error('Error while sending like:', error);
    }
  };

  const viewComments = () => {
    setShowComments(!showComments);
    console.log(`Comments: ${showComments}`);
  };

  const handleSend = async () => {
    if (!commentContent.trim()) return;

    try {
      const response = await post(`posts/${id}/comments`, {
        body: commentContent
      });

      console.log('Comment sent:', response);
      setCommentContent('');

      refreshPosts();
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
              uniqueKey={`post-${id ?? `${authorId ?? 'na'}-${date ?? 'na'}-${listIndex}`}`}
              role={user.role.toLowerCase()}
              name={name}
              user={user}
              onUserUpdate={fetchUser}
              userId={authorId}
            />

            <div className="post-user-name">
              <p>{name}</p>
              <small>{formatDateTime(date)}</small>
            </div>

            <div className="edit-tag">
              <p>
                {edited && 'Edited'}
              </p>
            </div>

            <div className="edit-icon">
              <PostOptionsMenu
                uniqueKey={`postOptionsMenu-${id ?? `${authorId ?? 'na'}-${date ?? 'na'}-${listIndex}`}`}
                postId={id}
                content={content}
                author={user}
                refreshPosts={refreshPosts}
              />
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
                <div className='interaction-text'>Like ({likeCount})</div>
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
                {!likeCount && 'Be the first to like this'}
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
                {(allComments ? comments : comments.slice(-3)).map((comment, index) => {
                  const firstName = comment.firstName ?? comment.firstname ?? comment.user?.firstName ?? '';
                  const lastName = comment.lastName ?? comment.lastname ?? comment.user?.lastName ?? '';
                  const role = (comment.role ?? comment.user?.role ?? 'student').toLowerCase();
                  const userIdFromComment = comment.userId ?? comment.user_id ?? comment.user?.id;
                  const editedComment = comment.updatedAt && comment.updatedAt !== comment.createdAt;
                  return (
                    <div className="comment-detail" key={`comment-${comment.id ?? `${userIdFromComment ?? 'na'}-${index}`}`}>
                      <ProfileCircle
                        initials={`${firstName.charAt(0)}${lastName.charAt(0)}`}
                        uniqueKey={`comment-${comment.id ?? `${userIdFromComment ?? 'na'}-${index}`}`}
                        role={role}
                        userId={userIdFromComment}
                      />
                      <div className="comment-container">
                        <Comment name={`${firstName} ${lastName}`} content={comment.body ?? comment.content} editedComment={editedComment} />
                      </div>
                        <div className="edit-icon menu-comment">
                          <CommentOptionsMenu
                            uniqueKey={'commentOptionsMenu' + comment.id}
                            commentId={comment.id}
                            content={comment.body}
                            author={{ id: comment.userId, firstName: comment.firstName, lastName: comment.lastName }}
                            refreshPosts={refreshPosts}
                          />
                        </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="create-a-comment">
            <ProfileCircle
              initials={loggedInUserInitials}
              uniqueKey={`comment-${id ?? listIndex}-owninput`}
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
