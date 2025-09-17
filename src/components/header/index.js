import { API_URL } from '../../service/constants';
import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/cogIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';

const Header = () => {
  const { token, onLogout } = useAuth();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const menuId = 'header-profile-menu';
  const menuRef = useRef(null);

  const decoded = jwtDecode(token);

  const decodedId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
  console.log('Decoded ID:', decodedId);

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${decodedId}`);
        const data = await response.json();
        setLoggedInUser(data.data);
      } catch (error) {
        console.error('Error fetching logged in user:', error);
      }
    };

    fetchLoggedInUser();
  }, [decodedId]);

  const onClickProfileIcon = (e) => {
    e.stopPropagation();
    setCascadingMenuVisibleId(cascadingMenuVisibleId === menuId ? null : menuId);
  };

  if (!token) {
    return null;
  }

  console.log('Logged in user data:', loggedInUser);

  return (
    <header>
      <FullLogo textColour="white" />

      <div className="profile-icon" onClick={onClickProfileIcon}>
        <p>
          {loggedInUser?.firstName[0]}
          {loggedInUser?.lastName[0]}
        </p>
      </div>

      {cascadingMenuVisibleId === menuId && (
        <div className="user-panel" ref={menuRef}>
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>
                  {loggedInUser?.firstName[0]}
                  {loggedInUser?.lastName[0]}
                </p>
              </div>

              <div className="post-user-name">
                <p>
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </p>
                <small>Software Developer, Cohort {loggedInUser?.cohortId}</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to="/">
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>Log out</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
