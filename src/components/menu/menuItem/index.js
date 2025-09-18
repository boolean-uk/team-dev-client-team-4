import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', onClick }) => {
  return (
    <li>
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
