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
import { ProfileIconColor } from '../../userUtils/profileIconColor';
import mapSpecialism from '../../userUtils/mapSpecialism';

const Header = () => {
  const { token, onLogout, loggedInUser } = useAuth();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const menuId = 'header-profile-menu';
  const menuRef = useRef(null);
  const profileIconColor = ProfileIconColor(loggedInUser?.id || 0);

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

      <div className="profile-icon" onClick={onClickProfileIcon} style={{ backgroundColor: profileIconColor }}>
        <p>{loggedInUserInitials}</p>
      </div>

      {cascadingMenuVisibleId === menuId && (
        <div
          className="user-panel"
          ref={menuRef}
          data-menu-root="true"
          onClick={(e) => {
            // Prevent outside click handler from closing the menu before inner actions fire
            e.stopPropagation();
          }}
        >
          <Card>
            <section className="post-details">
              <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
                <p>{loggedInUserInitials}</p>
              </div>

              <div className="post-user-name">
                <p>
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </p>
                <small>{loggedInUser?.specialism}, Cohort {loggedInUser?.cohortId}</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={() => setCascadingMenuVisibleId(null)}
                  >
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#nogo">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    onMouseDown={(e) => {
                      // Fire early to beat any outside-click closers
                      e.preventDefault();
                      e.stopPropagation();
                      onLogout();
                    }}
                    onClick={(e) => {
                      // Safety: also prevent default on click
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
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
