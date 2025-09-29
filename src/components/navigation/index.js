import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIconFilled from '../../assets/icons/profileIconFilled';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import './style.css';

const Navigation = () => {
  const { token } = useAuth();

  if (!token) {
    return null;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const cohortLabel = userRole === 'Teacher' ? 'Cohorts' : 'Cohort';
  const isWelcomePage = location.pathname === '/welcome';
  const { loggedInUser } = useAuth();
  console.log('Navigation loggedInUser:', loggedInUser);



  return (
    <nav className={isWelcomePage ? 'inactive-nav' : ''}>
      <ul>
        <li className={location.pathname === '/' ? 'active-link' : ''}>
          <NavLink to="/">
            <HomeIcon isActive={ location.pathname === '/'} />
            <p>Home</p>
          </NavLink>
        </li>
        <li className={location.pathname === '/profile' ? 'active-link' : ''}>
          <NavLink to="/profile">
            <ProfileIconFilled isActive={ location.pathname === '/profile'}/>
            <p>Profile</p>
          </NavLink>
        </li>
        <li className={location.pathname === '/cohort' ? 'active-link' : ''}>
          {(loggedInUser == null) ? "" : (loggedInUser.cohortCourseId != null && <NavLink to="/cohort">
          {location.pathname === '/cohort'
            ? (
                <CohortIconFill colour="#000046" />
              )
            : (
                <CohortIcon colour="#64648c" />
              )}
            <p>{cohortLabel}</p>
          </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
