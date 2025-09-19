import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';

const Navigation = () => {
  const { token, loggedInUser } = useAuth();

  if (!token || !loggedInUser) {
    return null;
  }

  if (loggedInUser.role.toLowerCase() === 'student') {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <HomeIcon colour="#000046" />
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <ProfileIcon />
              <p>Profile</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <CohortIcon />
              <p>Cohort</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <HomeIcon colour="#000046" />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <ProfileIcon />
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <CohortIcon />
            <p>Cohort</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <CohortIcon />
            <p>Notes</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <CohortIcon />
            <p>Logs</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
