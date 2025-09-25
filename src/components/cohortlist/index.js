import { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import './style.css';
import { API_URL } from '../../service/constants';

const CohortList = ({ cohortId, userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (cohortId) {
      fetch(`${API_URL}/users/by_cohort/${cohortId}`)
        .then((res) => res.json())
        .then((data) => {
          const list = data?.data?.users ?? [];
          setUsers(list);
          console.log(data);

          setLoading(false);
        })
        .catch(() => {
          setUsers([]);
          setLoading(false);
        });
    } else {
      setUsers([]);
      setLoading(false);
    }
  }, [cohortId]);

  let description;
  if (loading) {
    description = 'Loading...';
  } else if (cohortId && users.length > 0) {
    description = `${(users[0]?.specialism)}, Cohort ${users[0]?.cohortId}`;
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
