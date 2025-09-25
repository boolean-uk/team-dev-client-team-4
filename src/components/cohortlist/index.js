import { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import './style.css';
import { API_URL } from '../../service/constants';

const CohortList = ({ cohortCourseId, userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cohortCourse, setCohortCourse] = useState(null);

  useEffect(() => {
    const fetchCohortUsers = async () => {
      setLoading(true);

      if (!cohortCourseId) {
        setUsers([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/cohortcourses/${cohortCourseId}`);
        const data = await res.json();
        const userList = data?.users ?? [];
        setUsers(userList);
        setCohortCourse(data ?? null);
      } catch (error) {
        console.error(error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCohortUsers();
  }, [cohortCourseId]);

  let description;
  if (loading) {
    description = 'Loading...';
  } else if (cohortCourse) {
    description = `${cohortCourse?.courseName}, Cohort ${cohortCourse?.cohortId}`;
  } else {
    description = 'You have not been assigned to a cohort yet';
  }

  return (
    <>
      <h4>My Cohort</h4>
      <p className="cohort-list-description">{description}</p>
      <hr />
      <ul className="cohort-list">
        {loading && <li>Loading...</li>}
        {!loading && users.length === 0 && <li>No users found</li>}
        {!loading &&
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
