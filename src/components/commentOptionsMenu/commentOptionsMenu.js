import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import { EditIcon } from '../../assets/icons/editIcon';
import './commentOptionsMenu.css';
import { useContext, useEffect, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import { DeleteIcon2 } from '../../assets/icons/deleteIcon2';
import useAuth from '../../hooks/useAuth';
import ReportIcon from '../../assets/icons/reportIcon';

const CommentOptionsMenu = ({ uniqueKey, content, authorId, commentId }) => {
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);
  const { loggedInUser } = useAuth();

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
        <CommentOptionsCascadingMenu authorId={authorId} loggedInUser={loggedInUser} />
      )}
    </div>
  );
};

const CommentOptionsCascadingMenu = ({ authorId, loggedInUser }) => {
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
      <MenuItem icon={<DeleteIcon2 />} text="Delete comment" />
    </Menu>
  );
};

export default CommentOptionsMenu;
