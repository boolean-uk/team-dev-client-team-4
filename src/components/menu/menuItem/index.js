import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';
import { useEffect, useRef, useState } from 'react';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', onClick, onMouseEnter, onMouseLeave, ...rest }) => {
  const itemRef = useRef(null);
  const [openLeft, setOpenLeft] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);

  const breakPxLimit = 300; // change this to decide how fast the cascading menu changes to other side

  useEffect(() => {
    if (children && itemRef.current) {
      requestAnimationFrame(() => {
        const rect = itemRef.current.getBoundingClientRect();
        const submenuWidth = breakPxLimit;
        const spaceRight = window.innerWidth - rect.right;

        console.log(
          'SPACE RIGHT',
          text,
          spaceRight,
          'rect',
          rect.right,
          'window',
          window.innerWidth
        );

        if (spaceRight < submenuWidth || spaceRight < 0 || rect.right === 0) {
          setOpenLeft(true);
        }
      });
    }
  }, [children]);

  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;

      if (spaceRight < breakPxLimit) {
        setOpenLeft(true);
      } else {
        setOpenLeft(false);
      }
      setHasMeasured(true);
    }
  };

  return (
    <li ref={itemRef} className={openLeft ? 'open-left' : ''} onMouseEnter={(e) => { handleMouseEnter(e); onMouseEnter?.(e); }} onMouseLeave={onMouseLeave} {...rest}>
      {linkTo === '#nogo' && onClick != null
        ? (
        <button onClick={onClick}>
          {icon}
          <p>{text}</p>
          {children && <ArrowRightIcon />}
        </button>
          )
        : (
        <NavLink to={linkTo}>
          {icon}
          <p>{text}</p>
          {children && <ArrowRightIcon />}
        </NavLink>
          )}
      {hasMeasured && children && <ul>{children}</ul>}
    </li>
  );
};

export default MenuItem;

MenuItem.displayName = 'MenuItem';
