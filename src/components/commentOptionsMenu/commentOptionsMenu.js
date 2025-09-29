import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import { EditIcon } from '../../assets/icons/editIcon';
import './commentOptionsMenu.css';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';
import { useContext, useState, useEffect, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import { DeleteIcon2 } from '../../assets/icons/deleteIcon2';
import useAuth from '../../hooks/useAuth';
import ReportIcon from '../../assets/icons/reportIcon';
import DeleteCommentConfirm from '../deleteCommentConfirm';
import EditCommentModal from '../editCommentModal';
import DropdownPortal from '../dropdownPortal/dropdownPortal';
import { PiDotsThree } from 'react-icons/pi';

const CommentOptionsMenu = ({ uniqueKey, content, author, commentId, refreshPosts }) => {
  const { openModal, setModal } = useModal();
  const { openDialog, setDialog } = useDialog();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);
  const { loggedInUser } = useAuth();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const showEditModal = () => {
    setModal('Edit Comment', <EditCommentModal commentContent={content} author={author} commentId={commentId} refreshPosts={refreshPosts}/>);
    openModal();
  };

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

    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });

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
      <PiDotsThree className="dots-icon" />
      {uniqueKey === cascadingMenuVisibleId && (
        <CommentOptionsCascadingMenu deleteComment={showDeleteDialog} editComment={showEditModal} authorId={author.id} loggedInUser={loggedInUser} position={menuPosition} />
      )}
    </div>
  );
};

const CommentOptionsCascadingMenu = ({ deleteComment, editComment, authorId, loggedInUser, position }) => {
  if (loggedInUser.role.toLowerCase() === 'student' && authorId !== loggedInUser.id) {
    return (
      <DropdownPortal position={position}>
        <Menu className="comment-options-dropdown">
          <MenuItem icon={<ReportIcon />} text="Report comment" linkTo={'#nogo'} />
        </Menu>
      </DropdownPortal>
    );
  }

  return (
    <DropdownPortal position={position}>
      <Menu className="comment-options-dropdown">
        <MenuItem icon={<EditIcon />} text="Edit comment" onClick={editComment}/>
        <MenuItem icon={<DeleteIcon2 />} text="Delete comment" onClick={deleteComment}/>
      </Menu>
    </DropdownPortal>
  );
};

export default CommentOptionsMenu;
