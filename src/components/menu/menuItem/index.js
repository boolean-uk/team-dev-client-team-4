import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', onClick, onMouseEnter, onMouseLeave, ...rest }) => {
  return (
    <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...rest}>
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
      {children && <ul>{children}</ul>}
    </li>
  );
};

export default MenuItem;

MenuItem.displayName = 'MenuItem';
