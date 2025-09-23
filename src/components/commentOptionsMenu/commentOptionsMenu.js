import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import { EditIcon } from '../../assets/icons/editIcon';
import './commentOptionsMenu.css';
import useDialog from '../../hooks/useDialog';
import { useContext, useEffect, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import { DeleteIcon2 } from '../../assets/icons/deleteIcon2';
import useAuth from '../../hooks/useAuth';
import ReportIcon from '../../assets/icons/reportIcon';
import DeleteCommentConfirm from '../deleteCommentConfirm';

const CommentOptionsMenu = ({ uniqueKey, content, authorId, commentId, refreshPosts }) => {
  const { openDialog, setDialog } = useDialog();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);
  const { loggedInUser } = useAuth();

  const showDeleteDialog = () => {
    setDialog(
      'Delete Comment?',
      <DeleteCommentConfirm commentId={commentId} refreshPosts={refreshPosts}/>,
      'Are you sure you want to delete this comment?'
    );
    openDialog();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setCascadingMenuVisibleId((prev) => (prev === uniqueKey ? null : uniqueKey));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setCascadingMenuVisibleId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setCascadingMenuVisibleId]);

  return (
    <div className="comment-options-wrapper" onClick={toggleMenu}>
      <p>...</p>
      {uniqueKey === cascadingMenuVisibleId && (
        <CommentOptionsCascadingMenu deleteComment={showDeleteDialog} authorId={authorId} loggedInUser={loggedInUser} />
      )}
    </div>
  );
};

const CommentOptionsCascadingMenu = ({ deleteComment, authorId, loggedInUser }) => {
  if (loggedInUser.role.toLowerCase() === 'student' && authorId !== loggedInUser.id) {
    return (
      <Menu className="comment-options-dropdown">
        <MenuItem icon={<ReportIcon />} text="Report comment" linkTo={'#nogo'} />
      </Menu>
    );
  }

  return (
    <Menu className="comment-options-dropdown">
      <MenuItem icon={<EditIcon />} text="Edit comment" />
      <MenuItem icon={<DeleteIcon2 />} text="Delete comment" onClick={deleteComment}/>
    </Menu>
  );
};

export default CommentOptionsMenu;
