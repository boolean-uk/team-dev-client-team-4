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
import DeleteStudentConfirm from '../deleteStudentConfirm';
import useDialog from '../../hooks/useDialog';
import MoveToCohortConfirm from '../moveToCohortConfirm';
import { ProfileIconColor } from '../../userUtils/profileIconColor';

const ProfileCircle = ({ initials, uniqueKey, role, userId, name }) => {
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
        <CascadingMenu role={role} id={userId} name={name} />
      )}

      <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
        <p>{initials}</p>
      </div>
    </div>
  );
};

const CascadingMenu = ({ role, id, name }) => {
  const { setDialog, openDialog } = useDialog();

  const showDeleteDialog = () => {
    setDialog(
      `Delete ${name}?`,
      <DeleteStudentConfirm studentId={id} />,
      <div className="dialog-texts">
        <p>Are you sure you want to delete this user?</p>
        <p>This will remove their account from Cohort Manager.</p>
      </div>
    );
    openDialog();
  };

  const showMoveToCohortDialog = (course, cohort, cohortId) => {
    setDialog(
      `Move ${name} to new cohort?`,
      <MoveToCohortConfirm studentId={id} cohortId={cohortId} />,
      <div className="dialog-texts">
        <p>
          Are you sure you want to move this user to <br />
          {course}, {cohort}?
        </p>
      </div>
    );
    openDialog();
  };

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
        <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
          <MenuItem
            icon={<CohortIconFill />}
            text="Cohort 1"
            onClick={() => showMoveToCohortDialog('Software Development', 'Cohort 1', 1)}
          />
          <MenuItem
            icon={<CohortIconFill />}
            text="Cohort 2"
            onClick={() => showMoveToCohortDialog('Software Development', 'Cohort 2', 2)}
          />
          <MenuItem
            icon={<CohortIconFill />}
            text="Cohort 3"
            onClick={() => showMoveToCohortDialog('Software Development', 'Cohort 3', 3)}
          />
        </MenuItem>

        <MenuItem icon={<MonitorIcon />} text="Frontend Development">
          <MenuItem
            icon={<CohortIconFill />}
            text="Cohort 1"
            onClick={() => showMoveToCohortDialog('Frontend Development', 'Cohort 1', 1)}
          />
          <MenuItem
            icon={<CohortIconFill />}
            text="Cohort 2"
            onClick={() => showMoveToCohortDialog('Frontend Development', 'Cohort 2', 2)}
          />
          <MenuItem
            icon={<CohortIconFill />}
            text="Cohort 3"
            onClick={() => showMoveToCohortDialog('Frontend Development', 'Cohort 3', 3)}
          />
        </MenuItem>
      </MenuItem>

      <MenuItem icon={<DeleteIcon />} text="Delete student" onClick={showDeleteDialog} />
    </Menu>
  );
};

export default ProfileCircle;
