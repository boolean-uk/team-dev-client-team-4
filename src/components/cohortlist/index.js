import React, { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import './style.css';
import { cohort } from '../../service/mockData';

const CohortList = ({ cohortId, userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (cohortId) {
      fetch(`https://localhost:7233/users/by_cohort/${cohortId}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data.users);
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
    description = cohort.name;
  } else {
    description = 'You have not been assigned to a cohort yet';
  }

  return (
    <>
      <p className="cohort-list-description">{description}</p>
      <hr />
      <ul className="cohort-list">
        {loading && <li>Loading...</li>}
        {!loading && users.length === 0 && <li>No users found</li>}
        {!loading &&
          users
            .filter((user) => user.id !== Number(userId))
            .map((user) => (
              <li key={user.id} className="cohort-list-item">
                <ProfileCircle
                  initials={`${user.profile?.firstName?.[0] ?? ''}${user.profile?.lastName?.[0] ?? ''}`.toUpperCase()}
                />
                <strong style={{ marginLeft: '8px' }}>
                  {user.profile?.firstName} {user.profile?.lastName}
                </strong>
              </li>
            ))}
      </ul>
    </>
  );
};

export default CohortList;
