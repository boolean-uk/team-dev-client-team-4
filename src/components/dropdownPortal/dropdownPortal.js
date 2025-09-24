import { createPortal } from 'react-dom';

const DropdownPortal = ({ children, position }) => {
  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: position.top - 30,
        left: position.left,
        zIndex: 9999
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;
