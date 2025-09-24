import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';

const Navigation = () => {
  const { token } = useAuth();

  if (!token) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li className={location.pathname === '/' ? 'active-link' : ''}>
          <NavLink to="/">
            <HomeIcon isActive={ location.pathname === '/'} />
            <p>Home</p>
          </NavLink>
        </li>
        <li className={location.pathname === '/profile' ? 'active-link' : ''}>
          <NavLink to="/profile">
            <ProfileIcon colour={location.pathname === '/profile' ? '#000046' : '#64648c'}/>
            <p>Profile</p>
          </NavLink>
        </li>
        <li className={location.pathname === '/cohort' ? 'active-link' : ''}>
          <NavLink to="/cohort">
            <CohortIcon colour={location.pathname === '/cohort' ? '#000046' : '#64648c'} />
            <p>Cohort</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
