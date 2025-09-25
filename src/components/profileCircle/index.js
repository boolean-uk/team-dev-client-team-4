import AddIcon from '../../assets/icons/addIcon';
import CohortIcon from '../../assets/icons/cohortIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';
import DeleteIcon from '../../assets/icons/deleteIcon';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import './style.css';
import React, { useContext, useState, useRef } from 'react';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import useDialog from '../../hooks/useDialog';
import MoveToCohortConfirm from '../moveToCohortConfirm';
import { ProfileIconColor } from '../../userUtils/profileIconColor';
import DeleteUserConfirm from '../deleteUserConfirm';
import useAuth from '../../hooks/useAuth';
import DropdownPortal from '../dropdownPortal/dropdownPortal';
import ProfileIconFilled from '../../assets/icons/profileIconFilled';

const ProfileCircle = ({ initials, uniqueKey, role, userId, name, user, onUserUpdate }) => {
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const ref = useRef(null);
  const profileIconColor = ProfileIconColor(userId);
  const { loggedInUser } = useAuth();
  const safeKey = uniqueKey ?? `profile-${userId ?? 'na'}`;
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (e) => {
    e.stopPropagation();
    const rect = ref.current.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX + 60 });
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
      {safeKey === cascadingMenuVisibleId && (
        <DropdownPortal position={menuPosition}>
          <CascadingMenu
            role={role}
            id={userId}
            name={name}
            currentCohortId={user?.cohortId}
            onUserUpdate={onUserUpdate}
            loggedInUser={loggedInUser}
          />
        </DropdownPortal>
      )}

      <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
        <p>{initials}</p>
      </div>
    </div>
  );
};

const CascadingMenu = ({ role, id, name, currentCohortId, onUserUpdate, loggedInUser }) => {
  const { setDialog, openDialog } = useDialog();

  const showDeleteDialog = () => {
    setDialog(
      `Delete ${name}?`,
      <DeleteUserConfirm userToDeleteId={id} />,
      <div className="dialog-texts">
        <div>
          Are you sure you want to delete this user? <br />
          This will remove their account from Cohort Manager.
        </div>
      </div>
    );
    openDialog();
  };

  const showMoveToCohortDialog = (course, cohort, newCohortId) => {
    setDialog(
      `Move ${name} to new cohort?`,
      <MoveToCohortConfirm userToMoveId={id} newCohortId={newCohortId} onUserUpdate={onUserUpdate}/>,
      <div className="dialog-texts">
        <div>
          Are you sure you want to move this user to <br />
          {course}, {cohort}?
        </div>
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

  const isLoggedInTeacher = loggedInUser?.role.toLowerCase() === 'teacher';
  const isSelf = loggedInUser?.id === id;

  return (
      <Menu className="profile-circle-menu" data-menu-root="true">
        <MenuItem icon={<ProfileIconFilled />} text="Profile" linkTo={'profile/' + id} />

      {isLoggedInTeacher && !isSelf && role !== 'teacher' && (
        <>
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
        </>
      )}
    </Menu>
  );
};

export default ProfileCircle;
