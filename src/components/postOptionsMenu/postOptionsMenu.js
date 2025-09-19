import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import { EditIcon } from '../../assets/icons/editIcon';
import './postOptionsMenu.css';
import EditPostModal from '../editPostModal';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';
import { useContext, useEffect, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import { DeleteIcon2 } from '../../assets/icons/deleteIcon2';
import DeletePostConfirm from '../deletePostConfirm';

const PostOptionsMenu = ({ uniqueKey, content, author, postId }) => {
  const { openModal, setModal } = useModal();
  const { openDialog, setDialog } = useDialog();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);

  const showEditModal = () => {
    setModal('Edit Post', <EditPostModal postContent={content} author={author} postId={postId} />);
    openModal();
  };

  const showDeleteDialog = () => {
    setDialog(
      'Delete Post?',
      <DeletePostConfirm postId={postId} />,
      'Are you sure you want to delete this post?'
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
    <div className="post-options-wrapper" onClick={toggleMenu}>
      <p>...</p>
      {uniqueKey === cascadingMenuVisibleId && (
        <PostOptionsCascadingMenu showEditModal={showEditModal} deletePost={showDeleteDialog} />
      )}
    </div>
  );
};

const PostOptionsCascadingMenu = ({ showEditModal, deletePost }) => {
  return (
    <Menu className="post-options-dropdown">
      <MenuItem icon={<EditIcon />} text="Edit post" onClick={showEditModal} />
      <MenuItem icon={<DeleteIcon2 />} text="Delete post" onClick={deletePost} />
    </Menu>
  );
};

export default PostOptionsMenu;
