import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/cogIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import { NavLink } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';

const Header = () => {
  const { token, onLogout, loggedInUser } = useAuth();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const menuId = 'header-profile-menu';
  const menuRef = useRef(null);

  const onClickProfileIcon = (e) => {
    e.stopPropagation();
    setCascadingMenuVisibleId(cascadingMenuVisibleId === menuId ? null : menuId);
  };

  if (!token) {
    return null;
  }

  const loggedInUserInitials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  console.log('Logged in user data:', loggedInUser);

  return (
    <header>
      <FullLogo textColour="white" />

      <div className="profile-icon" onClick={onClickProfileIcon}>
        <p>{loggedInUserInitials}</p>
      </div>

      {cascadingMenuVisibleId === menuId && (
        <div className="user-panel" ref={menuRef}>
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>{loggedInUserInitials}</p>
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
