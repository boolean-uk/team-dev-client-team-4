import { useContext } from 'react';
import ProfileCircle from '../profileCircle';
import './style.css';
import { myCohortCourseContext } from '../../context/myCohortCourseContext';

const CohortList = ({ userId }) => {
  const { cohort } = useContext(myCohortCourseContext);

  if (cohort === null) { return "loading cohortlist" }
  if (userId === null) { return "waiting for user" }

  const users = cohort.users;
  let description;

  if (users.length > 0) {
    description = `${cohort.courseName}, Cohort ${cohort.cohortName}`;
  } else {
    description = 'You have not been assigned to a cohort yet';
  }
  return (
    <>
      <h4>My Cohort</h4>
      <p className="cohort-list-description">{description}</p>
      <hr />
      <ul className="cohort-list">
        {users.length === 0 && <li>No users found</li>}
        {
          users
            .filter((user) => user.id !== Number(userId))
            .map((user, idx) => {
              const uid = user.id ?? user.userId ?? user.user_id ?? idx;
              return (
                <li key={uid} className="cohort-list-item">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <ProfileCircle
                    initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    userId={uid}
                    role={(user.role || '').toLowerCase()}
                    uniqueKey={`cohortlist-${uid}`}
                  />
                  <strong style={{ marginLeft: '8px' }}>
                    {user?.firstName} {user?.lastName}
                  </strong>
                </div>
              </li>
              );
            })}
      </ul>
    </>
  );
};

export default CohortList;
