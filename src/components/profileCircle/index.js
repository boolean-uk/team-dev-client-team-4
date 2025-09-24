import AddIcon from '../../assets/icons/addIcon';
import CohortIcon from '../../assets/icons/cohortIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';
import DeleteIcon from '../../assets/icons/deleteIcon';
import MonitorIcon from '../../assets/icons/monitorIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import './style.css';
import React, { useContext, useEffect, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import { ProfileIconColor } from '../../userUtils/profileIconColor';

const ProfileCircle = ({ initials, uniqueKey, role, userId }) => {
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);
  const profileIconColor = ProfileIconColor(userId);
  const safeKey = uniqueKey ?? `profile-${userId ?? 'na'}`;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setCascadingMenuVisibleId((prev) => (prev === safeKey ? null : safeKey));
  };

  return (
    <div
      className="profile-circle"
      onClick={toggleMenu}
      ref={ref}
      data-uid={safeKey}
      aria-haspopup="menu"
      aria-expanded={safeKey === cascadingMenuVisibleId}
    >
      {safeKey === cascadingMenuVisibleId && <CascadingMenu role={role} id={userId} />}

      <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
        <p>{initials}</p>
      </div>
    </div>
  );
};

const CascadingMenu = ({ role, id }) => {
  if (role === 'teacher') {
    return (
      <Menu className="profile-circle-menu" data-menu-root="true">
        <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={'profile/' + id} />
      </Menu>
    );
  }

  return (
    <Menu className="profile-circle-menu" data-menu-root="true">
      <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={'profile/' + id} />
      <MenuItem icon={<AddIcon />} text="Add note" />

      <MenuItem icon={<CohortIcon />} text="Move to cohort">
        <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>

        <MenuItem icon={<MonitorIcon />} text="Frontend Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>
      </MenuItem>

      <MenuItem icon={<DeleteIcon />} text="Delete student" />
    </Menu>
  );
};

export default ProfileCircle;
