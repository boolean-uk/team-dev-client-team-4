import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';
import { useEffect, useRef, useState } from 'react';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', onClick }) => {
  const itemRef = useRef(null);
  const [openLeft, setOpenLeft] = useState(false);

  const breakPxLimit = 300; // change this to decide how fast the cascading menu changes to other side

  useEffect(() => {
    if (children && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const submenuWidth = breakPxLimit;
      const spaceRight = window.innerWidth - rect.right;

      // console.log('SPACE RIGHT', text, spaceRight);

      if (spaceRight < submenuWidth || spaceRight < 0) {
        setOpenLeft(true);
      }
    }
  }, [children]);

  return (
    <li ref={itemRef} className={openLeft ? 'open-left' : ''}>
      {linkTo === '#nogo' && onClick != null ? (
        <button onClick={onClick}>
          {icon}
          <p>{text}</p>
          {children && <ArrowRightIcon />}
        </button>
      ) : (
        <NavLink to={linkTo}>
          {icon}
          <p>{text}</p>
          {children && <ArrowRightIcon />}
        </NavLink>
      )}
      {children && <ul>{children}</ul>}
    </li>
  );
};

export default MenuItem;
