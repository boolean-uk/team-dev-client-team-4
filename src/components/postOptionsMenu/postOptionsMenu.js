import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import { EditIcon } from '../../assets/icons/editIcon';
import './postOptionsMenu.css';
import EditPostModal from '../editPostModal';
import useModal from '../../hooks/useModal';
import { useContext, useEffect, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';

const PostOptionsMenu = ({ uniqueKey, content, author }) => {
  const { openModal, setModal } = useModal();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);

  const showEditModal = () => {
    setModal('Edit Modal', <EditPostModal postContent={content} author={author} />);
    openModal();
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
        <PostOptionsCascadingMenu showEditModal={showEditModal} />
      )}
    </div>
  );
};

const PostOptionsCascadingMenu = ({ showEditModal }) => {
  return (
    <Menu className="post-options-dropdown">
      <MenuItem icon={<EditIcon />} text="Edit post" onClick={showEditModal} />
    </Menu>
  );
};

export default PostOptionsMenu;
