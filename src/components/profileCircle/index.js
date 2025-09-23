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
import useDialog from '../../hooks/useDialog';
import MoveToCohortConfirm from '../moveToCohortConfirm';
import { ProfileIconColor } from '../../userUtils/profileIconColor';
import DeleteUserConfirm from '../deleteUserConfirm';

const ProfileCircle = ({ initials, uniqueKey, role, userId, name, user }) => {
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);
  const profileIconColor = ProfileIconColor(userId);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setCascadingMenuVisibleId((prev) => (prev === uniqueKey ? null : uniqueKey));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setCascadingMenuVisibleId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setCascadingMenuVisibleId]);

  return (
    <div className="profile-circle" onClick={toggleMenu}>
      {uniqueKey === cascadingMenuVisibleId && (
        <CascadingMenu role={role} id={userId} name={name} currentCohortId={user.cohortId} />
      )}

      <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
        <p>{initials}</p>
      </div>
    </div>
  );
};

const CascadingMenu = ({ role, id, name, currentCohortId }) => {
  const { setDialog, openDialog } = useDialog();

  const showDeleteDialog = () => {
    setDialog(
      `Delete ${name}?`,
      <DeleteUserConfirm userToDeleteId={id} />,
      <div className="dialog-texts">
        <p>Are you sure you want to delete this user?</p>
        <p>This will remove their account from Cohort Manager.</p>
      </div>
    );
    openDialog();
  };

  const showMoveToCohortDialog = (course, cohort, newCohortId) => {
    setDialog(
      `Move ${name} to new cohort?`,
      <MoveToCohortConfirm userToMoveId={id} newCohortId={newCohortId} />,
      <div className="dialog-texts">
        <p>
          Are you sure you want to move this user to <br />
          {course}, {cohort}?
        </p>
      </div>
    );
    openDialog();
  };

  const cohorts = {
    'Software Development': [
      { name: 'Cohort 1', id: 1 },
      { name: 'Cohort 2', id: 2 },
      { name: 'Cohort 3', id: 3 }
    ],
    'Frontend Development': [
      { name: 'Cohort 1', id: 1 },
      { name: 'Cohort 2', id: 2 },
      { name: 'Cohort 3', id: 3 }
    ]
  }

  if (role === 'teacher') {
    return (
      <Menu className="profile-circle-menu">
        <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={'profile/' + id} />
      </Menu>
    );
  }

  return (
    <Menu className="profile-circle-menu">
      <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={'profile/' + id} />
      <MenuItem icon={<AddIcon />} text="Add note" />
      <MenuItem icon={<CohortIcon />} text="Move to cohort">
        {Object.entries(cohorts).map(([course, cohortList]) => (
          <MenuItem key={course} icon={<SquareBracketsIcon />} text={course}>
            {cohortList
              .filter(c => c.id !== currentCohortId)
              .map(c => (
                <MenuItem
                  key={c.id}
                  icon={<CohortIconFill />}
                  text={c.name}
                  onClick={() => showMoveToCohortDialog(course, c.name, c.id)}
                />
              ))}
          </MenuItem>
        ))}
      </MenuItem>
      <MenuItem icon={<DeleteIcon />} text="Delete user" onClick={showDeleteDialog} />
    </Menu>
  );
};

export default ProfileCircle;
